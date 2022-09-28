// Model
import DepositLogModel from "../../../Model/Finance/Log/DepositLogModel.js";

export default class GetHistoryRepository {
// Private
	_email;

	constructor(email) {
		this._email = email;
	}

	async getDepositHistory () {
		const findHistory = await DepositLogModel.find({ email: this._email }).select({ __v: 0, updated_at: 0, created_at: 0, wallet_id: 0, email: 0 });

		if ( findHistory.length >= 1 )
			return findHistory;

		return false;
	}

}