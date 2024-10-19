# Automated Market Maker Bot for ApeSwap DEX on Polygon Network

This project is an Automated Market Maker (AMM) bot designed to trade tokens on the Polygon blockchain using the ApeSwap Router. The bot can buy and sell tokens automatically based on predefined price thresholds and other configurations set in the `.env` file. It also allows for randomization of buy and sell amounts and can dynamically decide how much to trade based on the current wallet balance.

## Features
- **Automated buying and selling**: The bot automatically buys tokens when the price drops below a certain threshold and sells them when the price rises above a certain threshold.
- **Configurable slippage**: The bot takes slippage into account when performing trades.
- **Randomized buy and sell amounts**: Avoid predictable trading patterns with randomized trade amounts between minimum and maximum values.
- **Dynamic balance checking**: The bot checks the wallet balance to ensure trades are made within the available balance.
- **Configurable trade behavior**: You can choose to either buy, sell, or do both by setting configuration flags in the `.env` file.

## Requirements
- Node.js (v16.x or later)
- Ethers.js (v6.x or later)
- An API key for [Alchemy](https://www.alchemy.com) or any other Polygon provider
- A wallet with MATIC and other token on the Polygon network

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/davidtacer/mm-dex-web3.git
    ```

2. Navigate to the project folder:

    ```bash
    cd mm-dex-web3
    ```

3. Install the required dependencies:

    ```bash
    npm or yarn install
    ```

4. Create a `.env` file by copying the provided `.env.sample`:

    ```bash
    cp .env.sample .env
    ```

5. Update the `.env` file with your specific configuration details:

    - `PRIVATE_KEY`: Your wallet private key for signing transactions.
    - `ALCHEMY_API_KEY`: Your Alchemy API key for interacting with the Polygon network.
    - `TRADE_MODE`: Set to `buy`, `sell`, or `both` to control the bot's behavior.
    - `BUY_THRESHOLD`: The price below which the bot will buy tokens.
    - `SELL_THRESHOLD`: The price above which the bot will sell tokens.
    - `BUY_MIN`, `BUY_MAX`: The minimum and maximum WETH amount to use when buying.
    - `SELL_MIN`, `SELL_MAX`: The minimum and maximum token amount to sell.
    - `SLIPPAGE`: The allowed slippage percentage for trades.

   Example `.env` file:

    ```ini
    PRIVATE_KEY=your-private-key-here
    ALCHEMY_API_KEY=your-alchemy-api-key-here
    TRADE_MODE=both  # Can be 'buy', 'sell', or 'both'
    BUY_THRESHOLD=0.15
    SELL_THRESHOLD=0.25
    BUY_MIN=0.0001
    BUY_MAX=0.0005
    SELL_MIN=0.0001
    SELL_MAX=0.0005
    SLIPPAGE=0.01  # 1% slippage
    ```

## Usage

1. Run the bot:

    ```bash
    node index.js
    ```

2. The bot will run continuously and check the current price of the token at the specified interval (1 minute by default). Based on the configuration, it will execute buy or sell trades as appropriate.

## How It Works

1. **Buying**: The bot monitors the price of a token (FOUR in this case). If the price falls below the `BUY_THRESHOLD`, it initiates a buy transaction using WETH.

2. **Selling**: If the token's price rises above the `SELL_THRESHOLD`, the bot will sell a specified amount of the token in exchange for WETH.

3. **Randomized Trade Amounts**: To avoid a fixed buy/sell pattern, the bot selects a random value between the specified min and max values for both buying and selling.

4. **Slippage**: The bot ensures that slippage is accounted for during trades, to avoid large deviations from expected price movements.

## Important Notes
- Ensure your wallet has enough MATIC to cover transaction fees.
- The bot uses MATIC for buying tokens and sells them for MATIC.
- This project is for educational purposes. Use at your own risk when deploying to a live network.

## License

This project is open-source under the MIT License.
