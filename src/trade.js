const { ethers } = require('ethers');
const { TRADE_MODE, INTERVAL, BUY_AMOUNT_MIN, BUY_AMOUNT_MAX, SELL_AMOUNT_MIN_TOKEN, SELL_AMOUNT_MAX_TOKEN, PRICE_THRESHOLDS  } = require('../config/config');
const { getRandomAmount, getTokenPrice } = require('./utils');
const buyTokens = require('./buy');
const sellTokens = require('./sell');

async function executeMarketMaking() {
    while (true) {
        try {
            const buyAmount = getRandomAmount(BUY_AMOUNT_MIN, BUY_AMOUNT_MAX);
            const etherAmount = ethers.parseEther('1');
            const currentPrice = await getTokenPrice(etherAmount);
            console.log(`${ethers.formatEther(etherAmount)} WETH == ${currentPrice} FOUR`);
            console.log('TRADE_MODE:',TRADE_MODE);

            // If trade mode is 'buy', execute buy operation only
            if (TRADE_MODE === 'buy') {
                await buyTokens(buyAmount);
            }
            // If trade mode is 'sell', execute sell operation only
            else if (TRADE_MODE === 'sell') {
                await sellTokens(getRandomAmount(SELL_AMOUNT_MIN_TOKEN, SELL_AMOUNT_MAX_TOKEN));
            }
            // If trade mode is 'both', check price and decide whether to buy or sell
            else if (TRADE_MODE === 'both') {
                if (shouldBuy(currentPrice)) {
                    await buyTokens(buyAmount);
                } else if (shouldSell(currentPrice)) {
                    await sellTokens(getRandomAmount(SELL_AMOUNT_MIN_TOKEN, SELL_AMOUNT_MAX_TOKEN));
                } else {
                    console.log('Holding...');
                }
            }

        } catch (error) {
            console.error('Error executing trade:', error);
        }

        await new Promise(res => setTimeout(res, INTERVAL));
    }
}

function shouldBuy(price) {
    return price > PRICE_THRESHOLDS.BUY_PRICE;
}

function shouldSell(price) {
    return price < PRICE_THRESHOLDS.SELL_PRICE;
}

module.exports = executeMarketMaking;
