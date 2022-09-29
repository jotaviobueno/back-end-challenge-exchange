import mongoose from "mongoose";

const BuyCryptoLog = mongoose.model("BuyCryptoLog", {

	email: String,
	buy_made_in: Date,
	value: String,
	usd: String,
	brl: String,
	eur: String,
	btc: String,
	eth: String,
});

export default BuyCryptoLog;