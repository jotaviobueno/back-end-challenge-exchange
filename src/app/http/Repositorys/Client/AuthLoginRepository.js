// Models
import LoginModel from "../../../Model/Client/LoginModel.js";

// Dependencies
import {nanoid} from "nanoid";

export default class Repository {
// Private
	_email;
	_session_id;

	constructor(email, session_id) {
		this._email = email;
		this._session_id = session_id;
	}

	async CreateSession() {

		try {
			return await LoginModel.create({
				email: this._email,
				session_id: nanoid(),
				created_at: new Date(),
				updated_at: new Date(),
				disconnected_in: null
			});

		} catch(e) {
			return false;
		}
	}

	async Logout() {
		return await LoginModel.updateOne({ session_id: this._session_id, disconnected_in: null }, { disconnected_in: new Date() });
	}
    
}