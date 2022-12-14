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

		const queryValidator = yup.object().shape({
			deposit_id: yup.string().required(),
		});

		try {
			await headersValidator.validate(req.headers);
			await queryValidator.validate(req.query);

		} catch (err) {
			return res.status(422).json({errors: err.errors});
		}

		await next();
	}
}

export default new GetHistoryRequest;