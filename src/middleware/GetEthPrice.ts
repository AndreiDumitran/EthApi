import CoinGeckoApi from '@crypto-coffee/coingecko-api';

(async () => {
	try {
		const coinGeckoApi = new CoinGeckoApi();
		const results = await coinGeckoApi.simple({
			ids: 'Bitcoin',
			vs_currencies: 'usd',
		});
		console.log(results);
	} catch (err) {
		// do something with the error
	}
})();
