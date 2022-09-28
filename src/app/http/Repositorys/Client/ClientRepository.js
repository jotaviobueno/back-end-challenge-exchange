// Models
import ClientModel from "../../../Model/Client/ClientModel.js";
import WalletModel from "../../../Model/Finance/WalletModel.js";

// Dependencies
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid"; 

export default class ClientRepository {
// Private
	_clientname; 
	_email;
	_cpf;
	_password;

	constructor(email, cpf, clientname,  password) {
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

	async CreateWallet() {
		try {

			await WalletModel.create({
				wallet_id: uuidv4(),
				email: this._email,
				cpf: this._cpf,
				brl: 0,
				eur: 0,
				usd: 0,
				created_at: new Date(),
				updated_at: new Date(),
				deleted_at: null
			});

		} catch(e) {
			return false;
		}
	}
    
}