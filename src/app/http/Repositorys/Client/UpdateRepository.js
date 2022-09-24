// Models
import ClientModel from "../../../Model/Client/ClientModel.js";
import NameChangeHistoryModel from "../../../Model/Client/Log/NameChangeHistoryModel.js";

export default class Repository {
// Private
	_email;
	_new_name;
	_old_name;
	_cpf;

	constructor(email, new_name, old_name, cpf ) {
		this._email = email;
		this._new_name = new_name;
		this._old_name = old_name;
		this._cpf = cpf;
	}

	async UpdateNameAndCreateLog() {
		try {
			const update = await ClientModel.updateOne({ email: this._email, deleted_at: null }, { clientname: this._new_name, updated_at: new Date() });

			if ( update.modifiedCount === 1 )
				return await NameChangeHistoryModel.create({ 
					new_name: this._new_name,
					old_name: this._old_name,
					email: this._email,
					cpf: this._cpf,
					created_at: new Date(),
					updated_at: new Date(),
				});

			return false;

		} catch(e) {
			return false;
		}
	}
    
}