// Repository
import Repository from "../../Repositorys/Finance/GetHistoryRepository.js";

// Helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
import ResponseHelper from "../../../Helper/ResponseHelper.js";
import AuthLoginHelper from "../../../Helper/Client/AuthLoginHelper.js";
import GetHistoryHelper from "../../../Helper/Finance/GetHistoryHelper.js";

class GetHistoryController {

	async DepositHistory(req, res) {
		const { session_id } = req.headers;

		const getSession = await AuthLoginHelper.ExistSession(session_id);
		
		if (! getSession )
			return ResponseHelper.unprocessableEntity( res, { error: "your session is invalid" } );

		const getUser = await ClientHelper.ExistEmail(getSession.email);

		if (! getUser)
			return ResponseHelper.unprocessableEntity( res, { error: "the email provided is invalid" } );

		const getHistory = await new Repository(getUser.email).getDepositHistory();

		if ( getHistory )
			return ResponseHelper.success( res, getHistory);

		if (! getHistory)
			return ResponseHelper.success( res, {
				nothing: "you haven't made any deposits yet",
			});

		return ResponseHelper.badRequest( res, { error: "unable to process your request, please try again" } );
	}

	async SeeOneDepositHistory(req, res) {
		const { session_id } = req.headers;
		const { deposit_id } = req.query;

		const getSession = await AuthLoginHelper.ExistSession(session_id);
		
		if (! getSession )
			return ResponseHelper.unprocessableEntity( res, { error: "your session is invalid" } );

		const getUser = await ClientHelper.ExistEmail(getSession.email);

		if (! getUser)
			return ResponseHelper.unprocessableEntity( res, { error: "the email provided is invalid" } );

		const getDeposit = await GetHistoryHelper.ExistDepositId(deposit_id);

		if (! getDeposit )
			return ResponseHelper.badRequest( res, { error: "the deposit id is not valid" } );

		if ( getDeposit.email !== getUser.email )
			return ResponseHelper.forbidden( res, { error: "we can't be with a request" } );

		if ( getDeposit )
			return ResponseHelper.success( res, getDeposit);
		
		return ResponseHelper.badRequest( res, { error: "unable to process your request, please try again" } );
	}
}

export default new GetHistoryController;