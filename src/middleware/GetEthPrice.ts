import CoinGecko from 'coingecko-api';

const CoinGeckoClient = new CoinGecko();

const GetData = async () => {
	let data = await CoinGeckoClient.simple.price({
		ids: 'ethereum',
		vs_currencies: 'usd',
	});
	return data.data.ethereum.usd;
};

export default GetData;
