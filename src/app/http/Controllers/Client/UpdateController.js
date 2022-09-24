// Repository
import Repository from "../../Repositorys/Client/UpdateRepository.js";

// Helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
import ResponseHelper from "../../../Helper/ResponseHelper.js";
import AuthLoginHelper from "../../../Helper/Client/AuthLoginHelper.js";

// Services

class UpdateController {

	async UpdateName(req, res) {
		const { session_id } = req.headers;
		const { new_name } = req.body;

		const getSession = await AuthLoginHelper.ExistSession(session_id);
		
		if (! getSession )
			return ResponseHelper.unprocessableEntity( res, { error: "your session is invalid" } );

		const getUser = await ClientHelper.ExistEmail(getSession.email);

		if (! getUser)
			return ResponseHelper.unprocessableEntity( res, { error: "the email provided is invalid" } );

		if ( new_name === getUser.clientname )
			return ResponseHelper.unprocessableEntity( res, { error: "the name cannot be the same as the one already on the account" } );

		const getUpdate = await new Repository(getUser.email, new_name, getUser.clientname, getUser.cpf).UpdateNameAndCreateLog();
        
		if ( getUpdate )
			return ResponseHelper.success( res, {
				new_name: getUpdate.new_name,
				old_name: getUpdate.old_name,
				email: getUpdate.email,
				updated_at: getUpdate.updated_at,
			});

		return ResponseHelper.badRequest( res, { error: "unable to process your request, please try again" } );
	}
}

export default new UpdateController;