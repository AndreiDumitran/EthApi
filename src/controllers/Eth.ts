import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import EthModel from '../models/Eth';
import GetData from '../middleware/GetEthPrice';
import Logging from '../library/Logging';
const createEthPrice = (req: Request, res: Response, next: NextFunction) => {
	GetData().then((result) => {
		const ethPrice = new EthModel({
			_id: new mongoose.Types.ObjectId(),
			price: result,
		});

		return ethPrice
			.save()
			.then((ethPrice) => res.status(201).json({ ethPrice }))
			.catch((error) => res.status(500).json({ error }));
	});
};
export default {
	createEthPrice,
};
