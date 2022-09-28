// Repository
import Repository from "../../Repositorys/Client/AuthTokenRepository.js";

// Helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
import ResponseHelper from "../../../Helper/ResponseHelper.js";
import AuthLoginHelper from "../../../Helper/Client/AuthLoginHelper.js";
import AuthTokenHelper from "../../../Helper/Client/AuthTokenHelper.js";

class AuthTokenController {
    
	async TokenGenerationToChangeEmail(req, res) {
		const { session_id } = req.headers;
		const { password } = req.body;

		await AuthTokenHelper.ValidateExpirationDate();

		const getSession = await AuthLoginHelper.ExistSession(session_id);
		
		if (! getSession )
			return ResponseHelper.unprocessableEntity( res, { error: "your session is invalid" } );

		const getUser = await ClientHelper.ExistEmail(getSession.email);

		if (! getUser)
			return ResponseHelper.unprocessableEntity( res, { error: "the email provided is invalid" } );

		if (! await AuthLoginHelper.ComparePassword( password, getUser.password ) )
			return ResponseHelper.notAuthorized( res, { error: "invalid credentials" } );

		await AuthTokenHelper.SeeHowManyTokensTheClientHas(getUser.email);
		
		const getToken = await new Repository(getUser.email).GenerateChangeEmailToken();
	
		if ( getToken )
			return ResponseHelper.created( res, {
				info: "token expires in one hour",
				status: getToken.status,
				token: getToken.token,
				created_at: getToken.created_at,
				updated_at: getToken.updated_at,
			});

		return ResponseHelper.badRequest( res, { error: "unable to process your request, please try again" } );
	}

	async TokenGenerationToPassword(req, res) {
		const { email } = req.body;

		await AuthTokenHelper.ValidateTokenExpirationDate();

		const getUser = await ClientHelper.ExistEmail(email);

		if (! getUser)
			return ResponseHelper.unprocessableEntity( res, { error: "the email provided is invalid" } );

		await AuthTokenHelper.ValidateAmountOfTokens(getUser.email);

		const getToken = await new Repository( getUser.email ).GenerateChangePasswordToken();

		if ( getToken )
			return ResponseHelper.created( res, {
				info: "token expires in one hour",
				status: getToken.status,
				token: getToken.token,
				created_at: getToken.created_at,
				updated_at: getToken.updated_at,
			});

		return ResponseHelper.badRequest( res, { error: "unable to process your request, please try again" } );
	}
}

export default new AuthTokenController;