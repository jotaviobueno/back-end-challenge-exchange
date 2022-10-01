// Model
import WalletModel from "../../../Model/Finance/WalletModel.js";
import BuyCryptoLogModel from "../../../Model/Finance/Log/BuyCryptoLogModel.js";
import SellCryptoLogModel from "../../../Model/Finance/Log/SellCryptoLogModel.js";

export default class FinanceRepository {
// Private
	_email;
	_stable_coin_value;
	_crypto_tag_value;
	_valueInCrypto;
	_value;

	constructor(email, stable_coin, crypto_tag, stable_coin_value, valueInCrypto, value) {
		this._email = email;
		this.stable_coin = stable_coin;
		this.crypto_tag = crypto_tag;
		this._stable_coin_value = stable_coin_value;
		this._valueInCrypto = valueInCrypto;
		this._value = value;
	}

	async BuyCryptoAndCreateLog() {
		try {
			const update = await WalletModel.updateOne({ email: this._email, deleted_at: null }, 
				{ [this.stable_coin]: this._stable_coin_value, [this.crypto_tag]: this._valueInCrypto, updated_at: new Date() });

			if ( update.matchedCount === 1 )
				return await BuyCryptoLogModel.create({
					email: this._email,
					buy_made_in: new Date(),
					value: `+ ${this._valueInCrypto}`,
					[this.crypto_tag]: `= ${this._valueInCrypto}`,
					[this.stable_coin]: `- ${this._value}`
				});

		} catch (e) {
			return false;
		}
	}

	async SellCryptoAndCreateLog() {
		try {

			const update = await WalletModel.updateOne({ email: this._email, deleted_at: null }, {
				[this.stable_coin]: this._valueInCrypto, [this.crypto_tag]: this._stable_coin_value, updated_at: new Date()});

			if ( update.matchedCount === 1 )
				return await SellCryptoLogModel.create({
					email: this._email,
					buy_made_in: new Date(),
					value: `+ ${this._valueInCrypto}`,
					[this.crypto_tag]: `- ${this._value}`,
					[this.stable_coin]: `+ ${this._valueInCrypto} `
				});
		} catch (e) {
			return false;
		}
	}
}