// Models
import EmailChangeTokensModel from "../../../Model/Client/Tokens/EmailChangeTokensModel.js";
import PasswordChangeTokensModel from "../../../Model/Client/Tokens/PasswordChangeTokensModel.js";

// Dependencies
import {nanoid} from "nanoid";

export default class AuthTokenRepository {
// Private
	_email;

	constructor(email) {
		this._email = email;
	}

	async GenerateChangeEmailToken() {

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

	async GenerateChangePasswordToken() {
		try {
			return await PasswordChangeTokensModel.create({
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