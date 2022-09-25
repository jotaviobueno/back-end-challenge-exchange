// Dependencies
import yup from "yup";

class AuthTokenRequest {

	async ValidateEmailTokenGeneration( req, res, next ) {

		const headersValidator = yup.object().shape({
			session_id: yup.string().email().required(),
		});

		const bodyValidator = yup.object().shape({
			passwrod: yup.string().required(),
		});

		try {
			await bodyValidator.validate(req.body);
			await headersValidator.validate(req.headers);

		} catch (err) {
			return res.status(422).json({errors: err.errors});
		}

		await next();
	}

	async ValidatePasswordTokenGeneration( req, res, next ) {

		const bodyValidator = yup.object().shape({
			email: yup.string().email().required(),
		});

		try {
			await bodyValidator.validate(req.body);

		} catch (err) {
			return res.status(422).json({errors: err.errors});
		}

		await next();
	}
}

export default new AuthTokenRequest;