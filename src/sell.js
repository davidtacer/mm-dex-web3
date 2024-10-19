const { WALLET, ROUTER_ADDRESS, ROUTER_ABI, WETH_ADDRESS, TOKEN_ADDRESS, INTERVAL } = require('../config/config');
const { checkAllowance, approveTokens } = require('./allowance');
const ethers = require('ethers');

const router = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, WALLET);

async function sellTokens(amount) {
    console.log('!!!!SELL!!!!');
    const allowance = await checkAllowance(WALLET.address, ROUTER_ADDRESS);

    if (allowance < amount) {
        await approveTokens(amount);
    }

    const deadline = Math.floor(Date.now() / 1000) + 60 * 10;
    const path = [TOKEN_ADDRESS, WETH_ADDRESS];

    console.log(`Selling ${ethers.formatUnits(amount, 18)} tokens...`);

    const tx = await router.swapExactTokensForETH(
        amount,
        0,
        path,
        WALLET.address,
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

module.exports = sellTokens;
