import axios from 'axios';
import Logging from '../library/Logging';

const url: string = `http://127.0.0.1:${process.env.SERVER_PORT}/price/createPrice`;

const AutoPOSTRequest = () => {
	axios
		.post(url)
		.then((response) => {})
		.catch((error) => {
			Logging.error('Error on AutoPOST ');
			Logging.error(error);
		});
};

export default {
	AutoPOSTRequest,
};
