// Dependencies
import yup from "yup";

class UpdateRequest {
	async ValidateUpdateName ( req, res, next ) {

		const bodyValidator = yup.object().shape({
			new_name: yup.string().required(),
		});

		const headersValidator = yup.object().shape({
			session_id: yup.string().required(),
		});

		try {
			await headersValidator.validate(req.headers);
			await bodyValidator.validate(req.body);


		} catch (err) {
			return res.status(422).json({errors: err.errors});
		}

		await next();
	}
}

export default new UpdateRequest;