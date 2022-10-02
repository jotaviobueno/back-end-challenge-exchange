// Model
import WalletModel from "../../Model/Finance/WalletModel.js";

class FinanceHelper {

	verifyStableCoin(coin) {
		const fiatCoin = [{coin: "brl"}, {coin: "usd"}, {coin: "eur"}];

		const filter = fiatCoin.filter( (fiat) => fiat.coin === coin);

		if ( filter.length != 1 )
			return false;

		return true;
	}

	async GetWallet(email) {
		return await WalletModel.findOne({ email: email, deleted_at: null });
	}

	async ExistWallet(wallet_id) {
		const findWallet = await WalletModel.findOne({ wallet_id: wallet_id, deleted_at: null });

		if (! findWallet )
			return false;

		return findWallet;
	}

	sub(wallet, coin, amount) {
		return parseFloat(wallet[coin]) - parseFloat(amount);
	}

	sum (wallet, coin, amount) {
		return parseFloat(wallet[coin]) + parseFloat(amount);
	}
}

export default new FinanceHelper;