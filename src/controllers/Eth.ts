import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Eth from '../models/Eth';
import CoinGeckoApi from '@crypto-coffee/coingecko-api';
import Logging from '../library/Logging';

const createEthPriceRecord = (req: Request, res: Response, next: NextFunction) => {
	const recording = async () => {
		try {
			const coinGeckoApi = new CoinGeckoApi();
			const results = await coinGeckoApi.simple({
				ids: 'Ethereum',
				vs_currencies: 'usd',
			});
			return results;
		} catch (err) {
			Logging.error('Cannot fetch date from Coin Gecko API.');
		}
	};

	const ethPrice = new Eth({
		_id: new mongoose.Types.ObjectId(),
		recording,
		timestamp: Date.now(),
	});
	return ethPrice
		.save()
		.then((ethPrice) => res.status(201).json({ ethPrice }))
		.catch((error) => res.status(500).json({ error }));
};
const readEthPriceRecord = (req: Request, res: Response, next: NextFunction) => {
	const timeStamp = req.params.timeStamp;

	return Eth.findById(timeStamp)
		.then((ethPrice) => (ethPrice ? res.status(200).json({ ethPrice }) : res.status(404).json({ message: 'Not found.' })))
		.catch((error) => res.status(500).json({ error }));
};
const deleteEthPriceRecord = (req: Request, res: Response, next: NextFunction) => {
	const timeStamp = req.params.timeStamp;
	return Eth.findByIdAndDelete(timeStamp)
		.then((ethPrice) => (ethPrice ? res.status(200).json({ message: 'Record Deleted.' }) : res.status(404).json({ message: 'Not found.' })))
		.catch((error) => res.status(500).json({ error }));
};

export default {
	createEthPriceRecord,
	readEthPriceRecord,
	deleteEthPriceRecord,
};
