// Model
import WalletModel from "../../Model/Finance/WalletModel.js";

class FinanceHelper {

	verifyCoin(coin) {
		const fiatCoin = [{coin: "brl"}, {coin: "usd"}, {coin: "eur"}];

		const filter = fiatCoin.filter( (fiat) => fiat.coin === coin);

		if ( filter.length != 1 )
			return false;

		return true;
	}

	async GetWallet(email) {
		return await WalletModel.findOne({ email: email, deleted_at: null });
	}

	sum (wallet, coin, amount) {
		return parseFloat(wallet[coin]) + parseFloat(amount);
	}
}

export default new FinanceHelper;