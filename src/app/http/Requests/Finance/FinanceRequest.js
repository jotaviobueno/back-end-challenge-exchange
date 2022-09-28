// Dependencies
import yup from "yup";

class FinanceRequest {

	async ValidateDeposit( req, res, next ) {

		const bodyValidator = yup.object().shape({
			amount: yup.number().required(),
		});

		const headersValidator = yup.object().shape({
			session_id: yup.string().required(),
		});

		const paramsValidator = yup.object().shape({
			coin: yup.string().required(),
		});


		try {
			await bodyValidator.validate(req.body);
			await headersValidator.validate(req.headers);
			await paramsValidator.validate(req.params);

		} catch (err) {
			return res.status(422).json({errors: err.errors});
		}

		await next();
	}
}

export default new FinanceRequest;