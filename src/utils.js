const { ROUTER_ABI, ROUTER_ADDRESS, WETH_ADDRESS, TOKEN_ADDRESS, WALLET } = require('../config/config');
const ethers = require('ethers');

function getRandomAmount(min, max) {
    const minInEther = Number(ethers.formatEther(min));
    const maxInEther = Number(ethers.formatEther(max));
    const randomEther = Math.random() * (maxInEther - minInEther) + minInEther;
    return ethers.parseEther(randomEther.toFixed(18));
}

async function getTokenPrice(amount) {
    const router = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, WALLET);
    const amounts = await router.getAmountsOut(amount, [WETH_ADDRESS, TOKEN_ADDRESS]);
    return ethers.formatUnits(amounts[1], 18);
}

module.exports = { getRandomAmount, getTokenPrice };
