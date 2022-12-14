// Repository
import Repository from "../../Repositorys/Client/AuthLoginRepository.js";

// Helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
import ResponseHelper from "../../../Helper/ResponseHelper.js";
import AuthLoginHelper from "../../../Helper/Client/AuthLoginHelper.js";

class AuthLoginController {

	async SignIn(req, res) {
		const { email, password } = req.body;

		const getUser = await ClientHelper.ExistEmail(email);

		if (! getUser)
			return ResponseHelper.unprocessableEntity( res, { error: "the email provided is invalid" } );

		if (! await AuthLoginHelper.ComparePassword(password, getUser.password ))
			return ResponseHelper.unprocessableEntity( res, { error: "invalid credentials" } );

		await AuthLoginHelper.ValidateSession(getUser.email);

		const getSession = await new Repository(getUser.email).CreateSession();

		if ( getSession )
			return ResponseHelper.success( res, { 
				status: "login done",
				email: getSession.email,
				clientname: getUser.clientname,
				session_id: getSession.session_id,
				created_at: getSession.created_at
			});

		return ResponseHelper.badRequest( res, { error: "unable to process your request, please try again" } );
	}

	async Logout(req, res) {
		const {session_id} = req.headers;

		const getSession = await AuthLoginHelper.ExistSession(session_id);
		
		if (! getSession )
			return ResponseHelper.unprocessableEntity( res, { error: "your session is invalid" } );

		const getUser = await ClientHelper.ExistEmail(getSession.email);

		if (! getUser)
			return ResponseHelper.unprocessableEntity( res, { error: "the email provided is invalid" } );

		const updateSession = await new Repository(getUser.email, getSession.session_id).Logout();

		if ( updateSession.modifiedCount === 1 )
			return ResponseHelper.success( res, { success: "disconnected" } );

		return ResponseHelper.badRequest( res, { error: "unable to process your request, please try again" } );
	}
}

export default new AuthLoginController;