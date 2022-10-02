// Models
import WalletModel from "../../../Model/Finance/WalletModel.js";
import TransferMoneyModel from "../../../Model/Finance/Log/TransferMoneyModel.js";

class SendRepository {

	async SendMoneyAndCreateLog(email, sender_email, stableCoin, value, amount_sent, wallet_id, sender_wallet_id) {
		try {

			const updateTheSent = await WalletModel.updateOne({ email: email, deleted_at: null }, {
				[stableCoin]: value, updated_at: new Date()
			});

			const updateb = await WalletModel.updateOne({ email: sender_email, deleted_at: null }, {
				[stableCoin]: amount_sent, updated_at: new Date()
			});

			console.log(updateb, updateTheSent);

			if ( updateTheSent.matchedCount === 1 && updateb.matchedCount === 1 )
				return await TransferMoneyModel.create({
					sent_by: email,
					sent_by_wallet: wallet_id,
					received_by: sender_email,
					received_by_wallet: sender_wallet_id,
					[stableCoin]: value
				});

		} catch (e) {
			return false;
		}
	}

}

export default new SendRepository;