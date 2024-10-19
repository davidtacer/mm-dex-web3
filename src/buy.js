const { WALLET, ROUTER_ADDRESS, ROUTER_ABI, WETH_ADDRESS, TOKEN_ADDRESS, INTERVAL } = require('../config/config');
const ethers = require('ethers');

const router = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, WALLET);

async function buyTokens(buyAmount) {
    console.log('!!!!BUY!!!!');
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10-minute deadline
    const path = [WETH_ADDRESS, TOKEN_ADDRESS]; // WETH -> Token

    console.log(`Buying tokens worth ${ethers.formatEther(buyAmount)} WETH...`);

    const tx = await router.swapExactETHForTokens(
        0,
        path,
        WALLET.address,
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

module.exports = buyTokens;
