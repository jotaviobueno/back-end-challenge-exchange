// Dependencies
import mongoose from "mongoose";

// Model
const WalletModel = mongoose.model( "Wallet", {

	wallet_id: { type: String, required: true },
	email: { type: String, required: true },
	cpf: { type: String, required: true },
	brl: { type: Number, required: true },
	eur: { type: Number, required: true },
	usd: { type: Number, required: true },
	btc: { type: Number, required: true },
	eth: { type: Number, required: true },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
	deleted_at: { type: Date }
    
});

export default WalletModel;