// Dependencies
import yup from "yup";

class ClientRequest {

	async ValidateStorage ( req, res, next ) {

		const bodyValidator = yup.object().shape({
			clientname: yup.string().required(),
			email: yup.string().email().required(),
			cpf: yup.number().required(),
			password: yup.string().required(),
		});

		try {
			await bodyValidator.validate(req.body);

		} catch (err) {
			return res.status(422).json({errors: err.errors});
		}

		await next();
	}

}

export default new ClientRequest;