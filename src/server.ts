import express from 'express';
import http from 'http';
import mongoose, { mongo } from 'mongoose';

import { config } from './config/config';
import Logging from './library/Logging';
import AutoPOST from './middleware/AutoPOST';
import EthRoutes from './routes/Eth';

const router = express();

/** Connect to Mongo */
mongoose
	.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
	.then(() => {
		Logging.info('Connected to MongoDB.');
		StartServer();
	})
	.catch((error) => {
		Logging.error('Unable to connect:');
		Logging.error(error);
	});

/** Only start server if Mongo Connects */
const StartServer = () => {
	router.use((req, res, next) => {
		Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

		res.on('finish', () => {
			Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
		});
		next();
	});

	router.use(express.urlencoded({ extended: true }));
	router.use(express.json());

	router.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

		if (req.method == 'OPTIONS') {
			res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
			return res.status(200).json({});
		}
		next();
	});

	/** Routes */
	router.use('/price', EthRoutes);

	/** Healthcheck */
	router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

	/** Error */
	router.use((req, res, next) => {
		const error = new Error('Route not found');
		Logging.error(error);

		return res.status(404).json({ message: error.message });
	});

	http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}.`));
	setInterval(function () {
		AutoPOST.AutoPOSTRequest();
	}, 60000);
};
