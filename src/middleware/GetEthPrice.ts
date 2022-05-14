//1. Import coingecko-api
import CoinGecko from 'coingecko-api';

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

//3. Make calls
const GetData = async () => {
	let data = await CoinGeckoClient.simple.price({
		ids: 'ethereum',
		vs_currencies: 'usd',
	});
	return data.data.ethereum.usd;
};

export default GetData;
