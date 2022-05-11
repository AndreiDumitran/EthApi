import mongoose, { Document, Schema } from 'mongoose';

export interface IEthPrice {
	price: number;
}

export interface IEthPriceModel extends IEthPrice, Document {}

const EthPriceSchema: Schema = new Schema(
	{
		price: { type: Number },
	},
	{
		timestamps: true,
	}
);

EthPriceSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

export default mongoose.model<IEthPriceModel>('EthPrice', EthPriceSchema);
