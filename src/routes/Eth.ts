import express from 'express';
import controller from '../controllers/Eth';
import Logging from '../library/Logging';
import EthModel from '../models/Eth';

const router = express.Router();

router.post('/createPrice', controller.createEthPrice);
router.get('/get/singlePrice/:xMinsAgo', (req, res) => {
	const xMinsAgo = parseInt(req.params.xMinsAgo);
	EthModel.find()
		.sort({ expireAt: -1 })
		.skip(xMinsAgo - 1)
		.limit(1)
		.then((ethPrice) => (ethPrice ? res.status(200).json({ ethPrice }) : res.status(404).json({ message: 'Record not found' })))
		.catch((error) => res.status(500).json({ error }));
});
router.get('/get/getAll/:page/:limit', (req, res) => {
	const page = parseInt(req.params.page);
	const limit = parseInt(req.params.limit);

	const results = {};
	EthModel.find({})
		.skip(page * limit)
		.limit(limit)
		.exec((error, ethPrices) => {
			if (error) {
				res.status(500).send(error);
			} else {
				res.status(200).send(ethPrices);
			}
		});
});

export default router;
