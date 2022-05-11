import express from 'express';
import controller from '../controllers/Eth';

const router = express.Router();

router.post('/create', controller.createEthPriceRecord);
router.get('/get/:timeStamp', controller.readEthPriceRecord);
router.delete('/delete/:timeStamp', controller.deleteEthPriceRecord);

export = router;
