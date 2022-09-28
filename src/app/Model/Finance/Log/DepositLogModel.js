// Dependencies
import mongoose from "mongoose";

// Model
const DepositLogModel = mongoose.model( "depositlog", {

	wallet_id: { type: String, required: true },
	email: { type: String, required: true },
	status: { type: String, required: true }, 
	brl: { type: Number },
	eur: { type: Number },
	usd: { type: Number },
	btc: { type: Number },
	eth: { type: Number },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
    
});

export default DepositLogModel;