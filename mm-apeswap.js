require('dotenv').config();
const { ethers} = require('ethers');

const BUY_AMOUNT_MIN = ethers.parseEther('0.0001');  // Min WETH to spend on buying tokens
const BUY_AMOUNT_MAX = ethers.parseEther('0.0005');  // Max WETH to spent on buying tokens

const SELL_AMOUNT_MIN_TOKEN = ethers.parseUnits('0.00005');  // Minimum tokens to sell
const SELL_AMOUNT_MAX_TOKEN = ethers.parseUnits('0.0002');   // Maximum tokens to sell
// Interval between checks
const INTERVAL = 60000; // 60000 ms = 1 minute

// WMATIC token address
const WETH_ADDRESS = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270';
// FOUR token address
const TOKEN_ADDRESS = '0x48cBc913dE09317dF2365e6827Df50dA083701D5';
const SLIPPAGE = 0.01; // Slippage tolerance: 1%

// ApeSwap Router Address
const ROUTER_ADDRESS = '0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607';

const provider = new ethers.JsonRpcProvider(`https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// ApeSwap Router ABI
const routerABI = [
    'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
    'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable',
    'function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external'
];

// ERC20 ABI
const tokenABI = [
    'function approve(address spender, uint256 amount) external returns (bool)',
    'function allowance(address owner, address spender) external view returns (uint256)'
];

const router = new ethers.Contract(ROUTER_ADDRESS, routerABI, wallet);
const tokenContract = new ethers.Contract(TOKEN_ADDRESS, tokenABI, wallet);

async function checkAllowance(ownerAddress, spenderAddress) {
    return await tokenContract.allowance(ownerAddress, spenderAddress);
}

async function approveTokens(amount) {
    const tx = await tokenContract.approve(ROUTER_ADDRESS, amount);
    await tx.wait();
    console.log(`Approved ${ethers.formatUnits(amount, 18)} tokens for trading.`);
}

// Sell tokens for WETH
async function sellTokens(amount) {
    const allowance = await checkAllowance(wallet.address, ROUTER_ADDRESS);

    console.log(`Allowance: ${allowance}`);

    if (allowance < amount) {
        console.log(`Current allowance: ${allowance.toString()}, approving ${ethers.formatUnits(amount, 18)} tokens...`);
        await approveTokens(amount);
    } else {
        console.log(`Sufficient allowance already set for ${amount.toString()} tokens.`);
    }

    const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10-minute deadline
    const path = [TOKEN_ADDRESS, WETH_ADDRESS]; // Token -> WETH

    console.log(`Selling ${ethers.formatUnits(amount, 18)} tokens...`);

    const tx = await router.swapExactTokensForETH(
        amount,
        0,
        path,
        wallet.address,
        deadline
    );

    const receipt = await tx.wait();
    console.log('Sell transaction completed:', receipt.hash);
    console.log('Next check after:', INTERVAL, 'ms');
    console.log('-----------------------------------------------');
    console.log('-----------------------------------------------');
    console.log('-----------------------------------------------');
    console.log('-----------------------------------------------');
}

async function buyTokens(buyAmount) {
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes
    const path = [WETH_ADDRESS, TOKEN_ADDRESS]; // WETH -> Token

    console.log(`Buying tokens worth ${ethers.formatEther(buyAmount)} WETH...`);

    const tx = await router.swapExactETHForTokens(
        0,
        path,
        wallet.address,
        deadline,
        { value: buyAmount }
    );

    const receipt = await tx.wait();
    console.log('Buy transaction completed:', receipt.hash);
    console.log('Next check after:', INTERVAL, 'ms');
    console.log('-----------------------------------------------');
    console.log('-----------------------------------------------');
    console.log('-----------------------------------------------');
    console.log('-----------------------------------------------');
}

async function executeMarketMaking() {
    while (true) {
        try {
            const etherAmount = ethers.parseEther('1')
            const buyAmount = getRandomBuyAmount();
            // Check price to determine when to buy/sell
            const currentPrice = await getTokenPrice(etherAmount);
            console.log(`${ethers.formatEther(etherAmount)} WETH == ${currentPrice} FOUR`);

            if (shouldBuy(currentPrice)) {
                await buyTokens(buyAmount);
            } else if (shouldSell(currentPrice)) {
                await sellTokens(getRandomSellAmount());
            } else {
                console.log('Holding...');
            }

        } catch (error) {
            console.error('Error executing trade:', error);
        }

        await new Promise(res => setTimeout(res, INTERVAL)); // Wait before next check
    }
}

async function getTokenPrice(amount) {
    const amounts = await router.getAmountsOut(amount, [WETH_ADDRESS, TOKEN_ADDRESS]);
    const tokenPrice = amounts[1];
    return ethers.formatUnits(tokenPrice, 18);
}

function shouldBuy(price) {
    return price > 350;
}

function shouldSell(price) {
    return price < 200;
}
function getRandomSellAmount() {
    return getRandomAmount(SELL_AMOUNT_MIN_TOKEN, SELL_AMOUNT_MAX_TOKEN);
}
function getRandomBuyAmount() {
    return getRandomAmount(BUY_AMOUNT_MIN, BUY_AMOUNT_MAX);
}
function getRandomAmount(min, max) {
    // Convert BigNumbers to JavaScript numbers
    const minInEther = Number(ethers.formatEther(min));
    const maxInEther = Number(ethers.formatEther(max));

    // Generate a random number between min and max
    const randomEther = Math.random() * (maxInEther - minInEther) + minInEther;

    // Convert back to BigNumber
    return ethers.parseEther(randomEther.toFixed(18));
}
executeMarketMaking();
