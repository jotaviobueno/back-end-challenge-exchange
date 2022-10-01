// Models
import BuyCryptoLogModel from "../../../Model/Finance/Log/BuyCryptoLogModel.js";
import SellCryptoLogModel from "../../../Model/Finance/Log/SellCryptoLogModel.js";

class GetHistoryCryptoCoinRepository {
// Private
	_email;

	constructor(email) {
		this._email = email;
	}

	async getBuyHistory() {
		return await BuyCryptoLogModel.find({ email: this._email }).select({ __v: 0 });
	}

	async getSellHistory() {
		return await SellCryptoLogModel.find({ email: this._email }).select({ __v: 0 });
	}
}

export default GetHistoryCryptoCoinRepository;