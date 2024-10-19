require('dotenv').config();
const { ethers } = require('ethers');

module.exports = {
    TRADE_MODE: 'sell',  // Options: 'buy', 'sell', 'both'
    INTERVAL: 60000, // 60000 ms = 1 minute interval between checks
    BUY_AMOUNT_MIN: ethers.parseEther('0.0001'), // Min WETH to spend on buying tokens
    BUY_AMOUNT_MAX: ethers.parseEther('0.0005'), // Max WETH to spent on buying tokens
    SELL_AMOUNT_MIN_TOKEN: ethers.parseUnits('0.00005'), // Minimum tokens to sell
    SELL_AMOUNT_MAX_TOKEN: ethers.parseUnits('0.0002'),  // Maximum tokens to sell
    PRICE_THRESHOLDS: {
        BUY_PRICE: 260,   // If price is above this, consider buying
        SELL_PRICE: 260   // If price is below this, consider selling
    },
    WETH_ADDRESS: process.env.BASE_TOKEN_ADDRES,  // main chain token address (ETH, POL,...)
    TOKEN_ADDRESS: process.env.ERC20_TOKEN_ADDRESS, // token address (erc20)
    SLIPPAGE: 0.01,  // Slippage tolerance: 1%

    ROUTER_ADDRESS: '0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607',  // ApeSwap Router address
    // Wallet
    WALLET: new ethers.Wallet(process.env.PRIVATE_KEY, new ethers.JsonRpcProvider(`https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`)),

    // Router ABI
    ROUTER_ABI: [
        'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
        'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable',
        'function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external'
    ],

    // ERC20 ABI
    ERC20_ABI: [
        'function approve(address spender, uint256 amount) external returns (bool)',
        'function allowance(address owner, address spender) external view returns (uint256)'
    ]
};
