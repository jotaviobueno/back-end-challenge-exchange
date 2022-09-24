// Dependencies
import yup from "yup";

class AuthLoginRequest {

	async ValidateSignIn( req, res, next ) {

		const bodyValidator = yup.object().shape({
			email: yup.string().email().required(),
			password: yup.string().required(),
		});

		try {
			await bodyValidator.validate(req.body);

		} catch (err) {
			return res.status(422).json({errors: err.errors});
		}

		await next();
	}

	async ValidateLogout( req, res, next ) {

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

export default new AuthLoginRequest;