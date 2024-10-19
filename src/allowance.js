const { WALLET, ROUTER_ADDRESS, ERC20_ABI, TOKEN_ADDRESS } = require('../config/config');
const ethers = require('ethers');

const tokenContract = new ethers.Contract(TOKEN_ADDRESS, ERC20_ABI, WALLET);

async function checkAllowance(ownerAddress, spenderAddress) {
    return await tokenContract.allowance(ownerAddress, spenderAddress);
}

async function approveTokens(amount) {
    console.log(`Approving ${ethers.formatUnits(amount, 18)} tokens...`);
    const tx = await tokenContract.approve(ROUTER_ADDRESS, amount);
    await tx.wait();
    console.log(`Approved ${ethers.formatUnits(amount, 18)} tokens for trading.`);

}

module.exports = { checkAllowance, approveTokens };
