// Model
import DepositLogModel from "../../Model/Finance/Log/DepositLogModel.js";

class GetHistoryHelper {
    
	async ExistDepositId(deposit_id) {
		const findDeposit = await DepositLogModel.findOne({ _id: deposit_id }).select({__v: 0});

		if (! findDeposit )
			return false;

		return findDeposit;
	}
}

export default new GetHistoryHelper;