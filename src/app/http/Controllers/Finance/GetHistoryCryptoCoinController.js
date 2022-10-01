// Repository
import Repository from "../../Repositorys/Finance/GetHistoryCryptoCoinRepository.js";

// Helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
import ResponseHelper from "../../../Helper/ResponseHelper.js";
import AuthLoginHelper from "../../../Helper/Client/AuthLoginHelper.js";

class GetHistoryCryptoCoinController {

	async SeeCryptoCurrencyPurchaseHistory(req, res) {
		const {session_id} = req.headers;

		const getSession = await AuthLoginHelper.ExistSession(session_id);
		
		if (! getSession )
			return ResponseHelper.unprocessableEntity( res, { error: "your session is invalid" } );

		const getUser = await ClientHelper.ExistEmail(getSession.email);

		if (! getUser)
			return ResponseHelper.unprocessableEntity( res, { error: "the email provided is invalid" } );

		const getHistory = await new Repository(getUser.email).getBuyHistory();

		if ( getHistory.length === 0 )
			return ResponseHelper.success( res, {
				error: "could not find any purchase history in your account"
			});

		if ( getHistory.length > 0 )
			return ResponseHelper.success( res, getHistory);

		return ResponseHelper.badRequest( res, { error: "unable to process your request, please try again" } );
	}

	async ViewTheHistoryOfCryptocurrencySales(req, res) {
		const {session_id} = req.headers;

		const getSession = await AuthLoginHelper.ExistSession(session_id);
		
		if (! getSession )
			return ResponseHelper.unprocessableEntity( res, { error: "your session is invalid" } );

		const getUser = await ClientHelper.ExistEmail(getSession.email);

		if (! getUser)
			return ResponseHelper.unprocessableEntity( res, { error: "the email provided is invalid" } );

		const getHistory = await new Repository(getUser.email).getSellHistory();

		if ( getHistory.length === 0 )
			return ResponseHelper.success( res, {
				error: "could not find any purchase history in your account"
			});

		if ( getHistory.length > 0 )
			return ResponseHelper.success( res, getHistory);

		return ResponseHelper.badRequest( res, { error: "unable to process your request, please try again" } );
	}
}

export default new GetHistoryCryptoCoinController;