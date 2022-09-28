// Dependencies
import yup from "yup";

class GetHistoryRequest {

	async DepositHistory( req, res, next ) {

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

	async SeeOneDepositHistory( req, res, next ) {

		const headersValidator = yup.object().shape({
			session_id: yup.string().required(),
		});

		const bodyValidator = yup.object().shape({
			deposit_id: yup.string().required(),
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

export default new GetHistoryRequest;