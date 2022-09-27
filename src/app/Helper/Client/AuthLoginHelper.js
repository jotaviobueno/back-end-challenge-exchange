// Models
import LoginModel from "../../Model/Client/LoginModel.js";

// Dependencies
import bcrypt from "bcrypt";

class AuthLoginHelper {

	async ComparePassword(password, hash) {
		return await bcrypt.compare(password, hash);
	}

	async ValidateSession(email) {
		const findSession = await LoginModel.find({email: email, disconnected_in: null});
        
		if ( findSession.length >= 1 )
			await LoginModel.updateOne({email: email, disconnected_in: null}, { disconnected_in: new Date() });
	}

	async ExistSession(session_id) {
		const findSession = await LoginModel.findOne({ session_id: session_id, disconnected_in: null });

		if (! findSession )
			return false;
        
		return findSession;
	}

	async DisconnectAllSession(email) {
		try {
			const findSession = await LoginModel.findOne({ email: email, disconnected_in: null });

			if ( findSession != null )
				await LoginModel.updateOne({ session_id: findSession.session_id, disconnected_in: null }, 
					{ disconnected_in: new Date(), updated_at: new Date() });
			
		} catch (e) {
			console.log(e);
		}
	}
}

export default new AuthLoginHelper;