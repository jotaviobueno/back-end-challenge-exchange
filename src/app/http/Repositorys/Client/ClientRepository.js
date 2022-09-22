// Models
import ClientModel from "../../../Model/Client/ClientModel.js";

// Dependencies
import bcrypt from "bcrypt";

export default class Repository {
// Private
	_clientname; 
	_email;
	_cpf;
	_password;

	constructor(clientname, email, cpf, password) {
		this._clientname = clientname; 
		this._email = email;
		this._cpf = cpf;
		this._password = password;  
	}

	async Storage() {

		try {
			return await ClientModel.create({
				clientname: this._clientname,
				email: this._email,
				password: await bcrypt.hash(this._password, 10),
				cpf: this._cpf,
				created_at: new Date(),
				updated_at: new Date(),
				deleted_at: null
			});

		} catch(e) {
			return false;
		}
	}
    
}