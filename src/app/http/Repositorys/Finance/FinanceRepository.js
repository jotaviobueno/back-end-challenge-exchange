// Model
import WalletModel from "../../../Model/Finance/WalletModel.js";
import DepositLogModel from "../../../Model/Finance/Log/DepositLogModel.js";

export default class FinanceRepository {
// Private
	_email;
	_wallet_id;

	constructor(email, coin, value, wallet_id, depositValue) {
		this._email = email;
		this.coin = coin;
		this.value = value;
		this._wallet_id = wallet_id;
		this.depositValue = depositValue;
	}

	async AddValueAndCreateLog() {

		try {
			const update = await WalletModel.updateOne({ email: this._email, deleted_at: null }, 
				{ [this.coin]: this.value, updated_at: new Date() });
                
			if ( update.modifiedCount === 1 )
				return await DepositLogModel.create({
					wallet_id: this._wallet_id,
					status: "success",
					email: this._email,
					[this.coin]: this.depositValue,
					created_at: new Date(),
					updated_at: new Date(),
				});

		} catch (e) {
			console.log(e);
			return false;
		}
	}
}