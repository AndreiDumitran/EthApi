import mongoose, { Document, Schema } from 'mongoose';
export interface IEthPrice {
	price: number;
}

export interface IEthPriceModel extends IEthPrice, Document {}

const EthPriceSchema: Schema = new Schema({
	price: { type: Number, required: true, index: true },
	expireAt: {
		type: Date,
		default: Date.now,
		expires: '60m',
	},
});

export default mongoose.model<IEthPrice>('EthPrice', EthPriceSchema);
