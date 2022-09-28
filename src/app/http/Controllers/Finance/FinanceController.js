// Repository
import Repository from "../../Repositorys/Finance/FinanceRepository.js";

// Helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
import ResponseHelper from "../../../Helper/ResponseHelper.js";
import AuthLoginHelper from "../../../Helper/Client/AuthLoginHelper.js";
import FinanceHelper from "../../../Helper/Finance/FinanceHelper.js";

class FinanceController {

	async Deposit(req, res) {
		const { session_id } = req.headers;
		const { coin } = req.params;
		const { amount } = req.body;

		const getSession = await AuthLoginHelper.ExistSession(session_id);
		
		if (! getSession )
			return ResponseHelper.unprocessableEntity( res, { error: "your session is invalid" } );

		const getUser = await ClientHelper.ExistEmail(getSession.email);

		if (! getUser)
			return ResponseHelper.unprocessableEntity( res, { error: "the email provided is invalid" } );

		const getWallet = await FinanceHelper.GetWallet(getUser.email);

		if (! FinanceHelper.verifyCoin(coin))
			return ResponseHelper.badRequest( res, { error: "we cannot proceed with the deposit as the currency entered is invalid" } );

		if (amount < 5 )
			return ResponseHelper.badRequest( res, { error: "the deposit amount cannot be less than 5" } );

		const sum = FinanceHelper.sum(getWallet, coin, amount);

		const getUpdate = await new Repository(getUser.email, coin, sum, getWallet.wallet_id).AddValueAndCreateLog();

		if ( getUpdate )
			return ResponseHelper.success( res, {
				email: getUpdate.email,
				status: getUpdate.status,
				value_total: getUpdate.brl,
				deposited: amount,
				created_at: getUpdate.created_at,
				deposit_id: getUpdate._id,
				wallet_id: getUpdate.wallet_id
			});

		return ResponseHelper.badRequest( res, { error: "unable to process your request, please try again" } );
	}

	async Wallet(req, res) {
		const {session_id} = req.headers;

		const getSession = await AuthLoginHelper.ExistSession(session_id);
		
		if (! getSession )
			return ResponseHelper.unprocessableEntity( res, { error: "your session is invalid" } );

		const getUser = await ClientHelper.ExistEmail(getSession.email);

		if (! getUser)
			return ResponseHelper.unprocessableEntity( res, { error: "the email provided is invalid" } );

		const getWallet = await FinanceHelper.GetWallet(getUser.email);

		if (getWallet)
			return ResponseHelper.success( res, {
				wallet_id: getWallet.wallet_id,
				email: getWallet.email,
				cpf: getWallet.cpf,
				brl: getWallet.brl,
				eur: getWallet.eur,
				usd: getWallet.usd,
				btc: getWallet.btc,
				eth: getWallet.eth,
				created_at: getWallet.created_at,
				updated_at: getWallet.updated_at,
			} );

		return ResponseHelper.badRequest( res, { error: "unable to process your request, please try again" } );
	}
}

export default new FinanceController;