import mongoose from "mongoose";

const TransferMoney = mongoose.model("TransferMoney", {

	sent_by: String,
	sent_by_wallet: String,
	received_by: String,
	received_by_wallet: String,
	usd: String,
	brl: String,
	eur: String,
	btc: String,
	eth: String,
	
});

export default TransferMoney;