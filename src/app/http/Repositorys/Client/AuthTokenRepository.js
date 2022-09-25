// Models
import EmailChangeTokensModel from "../../../Model/Client/EmailChangeTokensModel.js";

// Dependencies
import {nanoid} from "nanoid";

export default class Repository {
// Private
	_email;

	constructor(email) {
		this._email = email;
	}

	async GenerateToken() {

		try {
			return await EmailChangeTokensModel.create({
				email: this._email,
				token: nanoid(),
				status: "generated",
				created_at: new Date(),
				updated_at: new Date(),
				expires_at: new Date().setHours(new Date().getHours() + 1),
			});

		} catch(e) {
			return false;
		}
	}
}