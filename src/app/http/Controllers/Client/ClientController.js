// Repository
import Repository from "../../Repositorys/Client/ClientRepository.js";

// Helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
import ResponseHelper from "../../../Helper/ResponseHelper.js";
import AuthLoginHelper from "../../../Helper/Client/AuthLoginHelper.js";

// Services

class ClientController {

	async SignUp(req, res) {
		const { clientname, email, cpf, password } = req.body;

		if ( await ClientHelper.ExistEmail(email) )
			return ResponseHelper.unprocessableEntity( res, { error: "already existing email." } );

		if ( await ClientHelper.ExistCpf(cpf) )
			return ResponseHelper.unprocessableEntity( res, { error: "cpf already exists" } );

		const getUser = await new Repository(clientname, email, cpf, password).Storage();

		if ( getUser)
			return ResponseHelper.created( res, { 
				status: "created",
				email: getUser.email,
				clientname: getUser.clientname,
				cpf: getUser.cpf
			});

		return ResponseHelper.badRequest( res, { error: "unable to process your request, please try again" } );
	}

	async Profile(req, res) {
		const { session_id } = req.headers;

		const getSession = await AuthLoginHelper.ExistSession(session_id);
		
		if (! getSession )
			return ResponseHelper.unprocessableEntity( res, { error: "your session is invalid" } );

		const getUser = await ClientHelper.ExistEmail(getSession.email);

		if (! getUser)
			return ResponseHelper.unprocessableEntity( res, { error: "the email provided is invalid" } );

		if ( getSession )
			return ResponseHelper.success( res, {
				clientname: getUser.clientname,
				email: getUser.email,
				cpf: getUser.cpf,
				created_at: getUser.created_at,
				updated_at: getUser.updated_at,
			} );

		return ResponseHelper.badRequest( res, { error: "unable to process your request, please try again" } );
	}
}

export default new ClientController;