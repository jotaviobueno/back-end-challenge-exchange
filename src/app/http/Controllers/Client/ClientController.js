// Repository
import Repository from "../../Repositorys/Client/ClientRepository.js";

// Helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
import ResponseHelper from "../../../Helper/ResponseHelper.js";

// Services

class ClientController {

	async Storage(req, res) {
		const { clientname, email, cpf, password } = req.body;

		if ( await ClientHelper.ExistEmail(email) )
			return ResponseHelper.unprocessableEntity( res, { error: "already existing email." } );

		if ( await ClientHelper.ExistCpf(cpf) )
			return ResponseHelper.unprocessableEntity( res, { error: "cpf already exists" } );

		const getUser = await new Repository(clientname, email, cpf, password).Storage();

		if ( getUser)
			return ResponseHelper.success( res, { 
				status: "created",
				email: getUser.email,
				username: getUser.username,
				cpf: getUser.cpf
			});

		return ResponseHelper.badRequest( res, { error: "unable to process your request, please try again" } );
	}
}

export default new ClientController;