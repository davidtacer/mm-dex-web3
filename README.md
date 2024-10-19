# Automated Market Maker Bot for ApeSwap DEX on Polygon Network

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-v18.20.3-brightgreen.svg)

A simple decentralized market-making bot that performs automated trading (buy/sell) on the Polygon network, utilizing ApeSwap as the DEX. This bot is capable of running in different trading modes such as **buy-only**, **sell-only**, or **both** based on user configuration. It adjusts buy and sell amounts randomly between a specified range and uses slippage to ensure trades are executed correctly.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Features](#features)
- [Environment Variables](#environment-variables)
- [Important Notes](#important-notes)
- [License](#license)
- [Contributing](#contributing)
- [Donations](#donations)

## Installation

To install and run this project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/davidtacer/mm-dex-web3.git
    ```

2. Install the dependencies:
    ```bash
    cd mm-dex-web3
    npm or yarn install
    ```

3. Copy `.env.sample` to `.env` file or and configure your environment variables (see [Environment Variables](#environment-variables)).
   ```bash
   cp .env.sample .env
    ```

4. Start the bot:
    ```bash
    node index.js
    ```

## Configuration

You can configure the behavior of the bot in the `config.js` file. This includes trading amounts, trading mode, price thresholds, and more.

Example `config.js` structure:
```javascript
module.exports = {
   TRADE_MODE: 'both',  // Options: 'buy', 'sell', 'both'
   INTERVAL: 60000, // 60000 ms = 1 minute interval between checks
   BUY_AMOUNT_MIN: ethers.parseEther('0.0001'), // Min WETH to spend on buying tokens
   BUY_AMOUNT_MAX: ethers.parseEther('0.0005'), // Max WETH to spent on buying tokens
   SELL_AMOUNT_MIN_TOKEN: ethers.parseUnits('0.00005'), // Minimum tokens to sell
   SELL_AMOUNT_MAX_TOKEN: ethers.parseUnits('0.0002'),  // Maximum tokens to sell
   PRICE_THRESHOLDS: {
      BUY_PRICE: 250,   // If price is above this, consider buying
      SELL_PRICE: 250   // If price is below this, consider selling
   },
   SLIPPAGE: 0.01,  // Slippage tolerance: 1%
  
};
```
## Usage

The bot can be run in different modes based on the `TRADE_MODE` setting in your `config.js`:

- **buy**: Only perform buy operations.
- **sell**: Only perform sell operations.
- **both**: Perform both buy and sell operations.

Example command:
```bash
node index.js
```
## Project Structure
```
├── config/
│   └── config.js            # Configuration file (set trading behavior)
├── src/
│   ├── trade.js             # Main trading logic (buy/sell based on mode)
│   ├── buy.js               # Buy tokens logic
│   ├── sell.js              # Sell tokens logic
│   └── utils.js             # Helper functions (random amounts, get token price)
├── .env                     # Environment variables (API keys, wallet details)
└── README.md                # Project documentation
```


### Features

- **Configurable Trading Behavior:** Control the bot's trade mode, buy/sell amounts, and trade intervals.
- **Randomized Trading Amounts:** Prevent predictable patterns by setting a random amount within a range for each trade.
- **Auto Adjusts for Slippage:** Ensures that trades are executed successfully even with price slippage.
- **Polygon Network Support:** Works on the Polygon network using ApeSwap as the DEX.
- **Automated Market Making:** Runs in an infinite loop checking prices and executing trades based on your configuration.

### Environment Variables

You need to configure the following environment variables in a `.env` file:

```ini
PRIVATE_KEY=<your-wallet-private-key>
ALCHEMY_API_KEY=<your-alchemy-api-key>
BASE_TOKEN_ADDRESS=<your-base-token-address>
ERC20_TOKEN_ADDRESS=<your-erc20-token-address>
```
- **ALCHEMY_API_KEY:** Your Alchemy API key for connecting to the Polygon network.
-  **PRIVATE_KEY:** The private key of the wallet that will perform trades.
-  **BASE_TOKEN_ADDRESS:** The address of the base token used for trading. For Polygon, this is the WMATIC address: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
-  **ERC20_TOKEN_ADDRESS:** The address of the ERC20 token to be traded.

## Important Notes
- Ensure your wallet has enough MATIC to cover transaction fees.
- The bot uses MATIC for buying tokens and sells them for MATIC.
- This project is for educational purposes. Use at your own risk when deploying to a live network.

## License

This project is open-source under the MIT License.

## Contributing

Contributions are welcome! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## Donations

If you find this project useful and would like to support its development, consider making a donation:

- **Ethereum (ETH)**: `0x689C4739E043369c47A4d585Ed5814E3EcaAdEF9`
- **Polygon (MATIC)**: `0x689C4739E043369c47A4d585Ed5814E3EcaAdEF9`
- **Basically any EWM Chain**: `0x689C4739E043369c47A4d585Ed5814E3EcaAdEF9`

Your support is greatly appreciated and helps keep this project alive!
