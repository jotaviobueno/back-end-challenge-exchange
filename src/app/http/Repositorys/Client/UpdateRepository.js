// Models
import ClientModel from "../../../Model/Client/ClientModel.js";
import NameChangeHistoryModel from "../../../Model/Client/Log/NameChangeHistoryModel.js";
import PasswordChangeHistoryModel from "../../../Model/Client/Log/PasswordChangeHistoryModel.js";
import EmailChangeHistoryModel from "../../../Model/Client/Log/EmailChangeHistoryModel.js";

// Dependencies
import bcrypt from "bcrypt";

export default class Repository {
// Private
	_email;
	_new_name;
	_old_name;
	_new_password;
	_new_email;

	constructor(email, new_name, old_name, password, new_email) {
		this._email = email;
		this._new_name = new_name;
		this._old_name = old_name;
		this._new_password = password;
		this._new_email = new_email;
	}

	async UpdateNameAndCreateLog() {
		try {
			const update = await ClientModel.updateOne({ email: this._email, deleted_at: null }, 
				{ clientname: this._new_name, updated_at: new Date() });

			if ( update.modifiedCount === 1 )
				return await NameChangeHistoryModel.create({ 
					new_name: this._new_name,
					old_name: this._old_name,
					email: this._email,
					created_at: new Date(),
					updated_at: new Date(),
				});

			return false;

		} catch(e) {
			return false;
		}
	}

	async UpdatePasswordAndCreateLog() {
		try {

			const update = await ClientModel.updateOne({ email: this._email, deleted_at: null }, {
				password: await bcrypt.hash(this._new_password, 10), updated_at: new Date() });

			if ( update.modifiedCount === 1 )
				return await PasswordChangeHistoryModel.create({
					email: this._email,
					created_at: new Date(),
					updated_at: new Date(),
				});

		} catch (e) {
			return false;
		}
	}
	
	async UpdateEmailAndCreateLog() {
		try {

			const update = await ClientModel.updateOne({ email: this._email, deleted_at: null }, 
				{ email: this._new_email, updated_at: new Date() });

			if ( update.modifiedCount === 1 )
				return await EmailChangeHistoryModel.create({
					email: this._new_email,
					old_email: this._email,
					created_at: new Date(),
					updated_at: new Date(),
				});

		} catch(e) {
			return false;
		}
	}
    
}