// Model
import EmailChangeTokensModel from "../../Model/Client/Tokens/EmailChangeTokensModel.js";
import PasswordChangeTokensModel from "../../Model/Client/Tokens/PasswordChangeTokensModel.js";

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

	async ValidateAmountOfTokens(email) {
		const findTokens = await PasswordChangeTokensModel.find({ email: email });

		if ( findTokens.length >= 1 )
			findTokens.forEach( async (tokens) => {
				
				if ( tokens.status != "used" )
					await PasswordChangeTokensModel.updateOne({ token: tokens.token }, { status: "discarded" });
			});
	}

	async ValidateTokenExpirationDate() {
		const findAllTokens = await PasswordChangeTokensModel.find({ status: "generated" });

		findAllTokens.forEach( async (tokens) => {
            
			if ( new Date() >= tokens.expires_at )
				await PasswordChangeTokensModel.updateOne({ token: tokens.token }, { status: "discarded" });
		});
	}

	async ExistToken(token) {
		const findToken = await PasswordChangeTokensModel.findOne({ token: token, status: "generated" });
		
		if (! findToken )
			return false;

		return findToken;
	}

	async DeleteChangePasswordToken(Token) {
		return await PasswordChangeTokensModel.updateOne({ token: Token, status: "generated" }, { status: "used" });
	}
}

export default new AuthTokenHelper;