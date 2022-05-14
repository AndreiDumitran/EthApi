import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import EthModel from '../models/Eth';
import GetData from '../middleware/GetEthPrice';
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
const getAll = (req: Request, res: Response, next: NextFunction) => {
	const page = parseInt(req.query.page);
	const limit = parseInt(req.query.limit);
	return EthModel.find()
		.then((ethPrice) => res.status(200).json({ ethPrice }))
		.catch((error) => res.status(500).json({ error }));
};
const readXMinsAgo = (req: Request, res: Response, next: NextFunction) => {
	let xMinsAgo = req.params.xMInsAgo;
	console.log(xMinsAgo);

	return EthModel.findOne({ expireAt: xMinsAgo })
		.then((ethPrice) => (ethPrice ? res.status(200).json({ ethPrice }) : res.status(404).json({ message: 'not found' })))
		.catch((error) => res.status(500).json({ error }));
};

export default {
	createEthPrice,
	readXMinsAgo,
	getAll,
};
