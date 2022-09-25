// Model
import EmailChangeTokensModel from "../../Model/Client/EmailChangeTokensModel.js";

class AuthTokenHelper {

	async SeeHowManyTokensTheClientHas(email) {
		const findTokens = await EmailChangeTokensModel.find({ email: email });
	
		if ( findTokens.length >= 1 )
			findTokens.forEach( async (tokens) => {
                
				if ( tokens.status !== "used" )
					await EmailChangeTokensModel.updateOne({ token: tokens.token }, { status: "discarded" });
			});
	}

	async ValidateExpirationDate() {
		const findAllTokens = await EmailChangeTokensModel.find({ status: "generated" });

		findAllTokens.forEach( async (tokens) => {
            
			if ( new Date() >= tokens.expires_at )
				await EmailChangeTokensModel.updateOne({ token: tokens.token }, { status: "discarded" });
		});
	}
}

export default new AuthTokenHelper;