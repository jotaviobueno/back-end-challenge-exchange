// Repository
import Repository from "../../Repositorys/Client/UpdateRepository.js";

// Helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
import ResponseHelper from "../../../Helper/ResponseHelper.js";
import AuthLoginHelper from "../../../Helper/Client/AuthLoginHelper.js";
import AuthTokenHelper from "../../../Helper/Client/AuthTokenHelper.js";

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

	async UpdatePassword(req, res) {
		const { change_token } = req.query;
		const { new_password } = req.body;

		await AuthTokenHelper.ValidateTokenExpirationDate();

		const getToken = await AuthTokenHelper.PasswordTokenExists(change_token);

		if (! getToken )
			return ResponseHelper.notAuthorized( res, { error: "invalid token" } );

		const getUser = await ClientHelper.ExistEmail(getToken.email);

		if (! getUser)
			return ResponseHelper.unprocessableEntity( res, { error: "the email provided is invalid" } );

		if ( await AuthLoginHelper.ComparePassword(new_password, getUser.password) )
			return ResponseHelper.notAuthorized( res, { error: "invalid token" } );

		const getUpdate = await new Repository(getUser.email, null, null, new_password).UpdatePasswordAndCreateLog();

		if ( getUpdate ) {
			
			await AuthLoginHelper.DisconnectAllSession(getUser.email);

			await AuthTokenHelper.DeleteChangePasswordToken(change_token);

			return ResponseHelper.success( res, {
				status: "updated",
				email: getUpdate.email,
				updated_at: getUpdate.updated_at,
			});
		}

		return ResponseHelper.badRequest( res, { error: "unable to process your request, please try again" } );
	}

	async UpdateEmail(req, res) {
		const { change_token } = req.query;
		const { new_email } = req.body;

		await AuthTokenHelper.ValidateExpirationDate();

		const getToken = await AuthTokenHelper.EmailTokenExists( change_token );

		if (! getToken )
			return ResponseHelper.notAuthorized( res, { error: "invalid token" } );

		const getUser = await ClientHelper.ExistEmail(getToken.email);

		if (! getUser)
			return ResponseHelper.unprocessableEntity( res, { error: "the email provided is invalid" } );

		const getNewUser = await ClientHelper.ExistEmail(new_email);

		if ( getNewUser)
			return ResponseHelper.unprocessableEntity( res, { error: "already existing email" } );

		if ( new_email === getUser.email )
			return ResponseHelper.unprocessableEntity( res, { error: "you cannot use the email that is already linked to your account" } );

		const getUpdate = await new Repository(getUser.email, "", "", "", new_email ).UpdateEmailAndCreateLog();

		if ( getUpdate ) {
			await AuthLoginHelper.DisconnectAllSession(getUser.email);

			await AuthTokenHelper.DeleteChangeEmailToken(change_token);

			await new Repository(getUser.email, "", "", "", new_email).UpdateWalletEmail();

			return ResponseHelper.success( res, {
				status: "update, your session has been disconnected, log in with the new email",
				new_email: getUpdate.new_email,
				old_email: getUpdate.old_email,
				updated_at: getUpdate.updated_at,
			});
		}

		return ResponseHelper.badRequest( res, { error: "unable to process your request, please try again" } );
	}
}

export default new UpdateController;