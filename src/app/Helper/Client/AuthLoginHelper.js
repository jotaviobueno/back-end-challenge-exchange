// Models
import LoginModel from "../../Model/Client/LoginModel.js";

// Dependencies
import bcrypt from "bcrypt";

class AuthLoginHelper {

	async ComparePassword(password, hash) {
		return await bcrypt.compare(password, hash);
	}

	async ValidateSession (email) {
		const findSession = await LoginModel.find({email: email, disconnected_in: null});
        
		if ( findSession.length >= 1 )
			await LoginModel.updateOne({email: email, disconnected_in: null}, { disconnected_in: new Date() });
	}
}

export default new AuthLoginHelper;