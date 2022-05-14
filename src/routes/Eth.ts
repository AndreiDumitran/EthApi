import express from 'express';
import controller from '../controllers/Eth';

const router = express.Router();

router.post('/createPrice', controller.createEthPrice);
router.get('/get/:xMinsAgo', controller.readXMinsAgo);
router.get('/get', controller.getAll);

export default router;
