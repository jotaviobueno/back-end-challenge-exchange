// Models
import ClientModel from "../../Model/Client/ClientModel.js";

class UserHelper {
    
	async ExistEmail(email) {
		const findEmail = await ClientModel.findOne({ email: email, deleted_at: null });

		if (! findEmail )
			return false;

		return findEmail;
	}

	async ExistCpf(cpf) {
		const findCpf = await ClientModel.findOne({ cpf: cpf, deleted_at: null });
	
		if (! findCpf )
			return false;

		return findCpf;
	}
}

export default new UserHelper;