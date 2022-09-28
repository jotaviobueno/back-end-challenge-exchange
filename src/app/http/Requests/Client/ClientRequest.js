// Dependencies
import yup from "yup";

class ClientRequest {

	async ValidateSignUp ( req, res, next ) {

		const bodyValidator = yup.object().shape({
			clientname: yup.string().required(),
			email: yup.string().email().required(),
			cpf: yup.string().required(),
			password: yup.string().required(),
		});

		try {
			await bodyValidator.validate(req.body);

		} catch (err) {
			return res.status(422).json({errors: err.errors});
		}

		await next();
	}

	async ValidateSeeProfile ( req, res, next ) {

		const headersValidator = yup.object().shape({
			session_id: yup.string().required(),
		});

		try {
			await headersValidator.validate(req.headers);

		} catch (err) {
			return res.status(422).json({errors: err.errors});
		}

		await next();
	}

}

export default new ClientRequest;