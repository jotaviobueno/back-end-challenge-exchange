// Models
import LoginModel from "../../../Model/Client/LoginModel.js";

// Dependencies
import {nanoid} from "nanoid";

export default class Repository {
// Private
	_email;

	constructor(email) {
		this._email = email;
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
    
}