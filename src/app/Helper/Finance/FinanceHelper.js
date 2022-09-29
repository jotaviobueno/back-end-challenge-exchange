// Model
import WalletModel from "../../Model/Finance/WalletModel.js";

import APICoinService from "../../http/Services/Finance/APICoinServices.js";

class FinanceHelper {

	verifyStableCoin(coin) {
		const fiatCoin = [{coin: "brl"}, {coin: "usd"}, {coin: "eur"}];

		const filter = fiatCoin.filter( (fiat) => fiat.coin === coin);

		if ( filter.length != 1 )
			return false;

		return true;
	}

	verifyCryptoCoin(coin) {
		const cryptoCoin = [{coin: "btc"}, {coin: "eth"}];

		const filter = cryptoCoin.filter( (crypto) => crypto.coin === coin);

		if ( filter.length != 1 )
			return false;

		return true;
	}

	async GetWallet(email) {
		return await WalletModel.findOne({ email: email, deleted_at: null });
	}

	async getPrice (cryptoCoin, stableCoin, amount) {
		const row = `${cryptoCoin.toUpperCase()}${stableCoin.toUpperCase()}`;
		const price = await APICoinService.GetPrice(cryptoCoin, stableCoin);

		return parseFloat(amount) / parseFloat(price[row].bid);
	}

	async sum (cryptoCoin, stableCoin, wallet, value) {
		const row = `${cryptoCoin.toUpperCase()}${stableCoin.toUpperCase()}`;
		const price = await APICoinService.GetPrice(cryptoCoin, stableCoin);
		const split = price[row].ask.split(".");
		const join = `${split[0]}${split[1]}`; 
		const setNumber = Number(join);
		const getTotalCrypto = parseFloat(value) / parseInt(setNumber);

		return parseFloat(wallet[cryptoCoin]) + parseFloat(getTotalCrypto);
	}

	sub (stable_coin, wallet, value) {
		const sub = parseFloat(wallet[stable_coin] - parseFloat(value));

		if ( sub < 0 )
			return false;

		return sub;
	}

}

export default new FinanceHelper;