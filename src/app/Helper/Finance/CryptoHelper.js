import APICoinService from "../../http/Services/Finance/APICoinServices.js";

class CryptoHelper {

	verifyCryptoCoin(coin) {
		const cryptoCoin = [{coin: "btc"}, {coin: "eth"}];

		const filter = cryptoCoin.filter( (crypto) => crypto.coin === coin);

		if ( filter.length != 1 )
			return false;

		return true;
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

		const getTotalCrypto = parseFloat(value) / parseInt(Number(join));

		return parseFloat(wallet[cryptoCoin]) + parseFloat(getTotalCrypto);
	}

	sub (cryptoCoin, wallet, value) {
		const sub = parseFloat(wallet[cryptoCoin] - parseFloat(value));

		if ( sub < 0 )
			return false;

		return sub;
	}

	async sum2 (cryptoCoin, stableCoin, wallet, value) {
		const row = `${cryptoCoin.toUpperCase()}${stableCoin.toUpperCase()}`;
		const price = await APICoinService.GetPrice(cryptoCoin, stableCoin);
		const split = price[row].ask.split(".");
		let join = `${split[0]}${split[1]}`; 

		if ( join.length < 6) {
			const add = `${join}0`;
			let number = Number(add);

			if ( value > wallet[cryptoCoin] )
				return false;
			
			const totalValue = parseFloat(value) * parseFloat(number);

			return wallet[cryptoCoin] + parseFloat(totalValue);
		}
		
		let number = Number(join);

		if ( value > wallet[cryptoCoin] )
			return false;

		const totalValue = parseFloat(value) * parseFloat(number);

		return wallet[cryptoCoin] + parseFloat(totalValue);
	}

	async sub2 (crypto_coin, wallet, value) {
		return parseFloat(wallet[crypto_coin]) - parseFloat(value);
	}
}

export default new CryptoHelper;