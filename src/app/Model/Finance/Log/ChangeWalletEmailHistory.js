// Dependencies
import mongoose from "mongoose";

// Model
const EmailChangeHistoryModel = mongoose.model( "ChangeWalletEmailHistory", {

	wallet_id: { type: String, required: true },
	old_email: { type: String, required: true },
	new_email: { type: String, required: true },
	cpf: { type: String, required: true },
	brl: { type: Number, required: true },
	eur: { type: Number, required: true },
	usd: { type: Number, required: true },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
    
});

export default EmailChangeHistoryModel;