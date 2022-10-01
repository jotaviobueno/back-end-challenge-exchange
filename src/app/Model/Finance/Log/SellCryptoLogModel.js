import mongoose from "mongoose";

const SellCryptoLog = mongoose.model("SellCryptoLog", {

	email: String,
	buy_made_in: Date,
	value: String,
	usd: String,
	brl: String,
	eur: String,
	btc: String,
	eth: String,
});

export default SellCryptoLog;