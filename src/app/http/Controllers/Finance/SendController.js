// Repository
import Repository from "../../Repositorys/Finance/SendRepository.js";

// Helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
import ResponseHelper from "../../../Helper/ResponseHelper.js";
import AuthLoginHelper from "../../../Helper/Client/AuthLoginHelper.js";
import FinanceHelper from "../../../Helper/Finance/FinanceHelper.js";

class SendMoneyController {

	async SendMoney(req, res) {
		const { session_id } = req.headers;
		const { received_by_wallet } = req.query;
		const { stable_coin } = req.params;
		const { value } = req.body;

		const getSession = await AuthLoginHelper.ExistSession(session_id);
		
		if (! getSession )
			return ResponseHelper.unprocessableEntity( res, { error: "your session is invalid" } );

		const getUser = await ClientHelper.ExistEmail(getSession.email);

		if (! getUser)
			return ResponseHelper.unprocessableEntity( res, { error: "the email provided is invalid" } );

		if (! FinanceHelper.verifyStableCoin(stable_coin))
			return ResponseHelper.badRequest( res, { error: "we cannot proceed with the deposit as the currency entered is invalid" } );

		const getWallet = await FinanceHelper.GetWallet(getUser.email);

		const sentToWallet = await FinanceHelper.ExistWallet(received_by_wallet);

		if (! sentToWallet )
			return ResponseHelper.badRequest( res, { error: "the deposit amount cannot be less than 5" } );

		const existUser = await ClientHelper.ExistEmail(sentToWallet.email);

		if (! existUser )
			return ResponseHelper.badRequest( res, { error: "the person you are trying to send has an invalid email address" } );

		if (value < 5 )
			return ResponseHelper.badRequest( res, { error: "the deposit amount cannot be less than 5" } );

		if ( value > getWallet[stable_coin] )
			return ResponseHelper.badRequest( res, { error: "you do not have this balance to be able to transfer" } );

		const sub = FinanceHelper.sub(getWallet, stable_coin, value);

		const sum = FinanceHelper.sum(sentToWallet, stable_coin, value);

		const Update = await Repository.SendMoneyAndCreateLog(getUser.email, sentToWallet.email, stable_coin, sub, sum, getWallet.wallet_id, sentToWallet.wallet_id );

		if ( Update )
			return ResponseHelper.success( res, Update );

		return ResponseHelper.badRequest( res, { error: "unable to process your request, please try again" } );
		
	}

}

export default new SendMoneyController;