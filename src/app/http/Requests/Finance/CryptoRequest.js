// Dependencies
import yup from "yup";

class CryptoRequest {

	async ValidateBuyCrypto( req, res, next ) {

		const bodyValidator = yup.object().shape({
			value: yup.number().required(),
		});

		const headersValidator = yup.object().shape({
			session_id: yup.string().required(),
		});

		const paramsValidator = yup.object().shape({
			stable_coin: yup.string().required(),
			crypto_coin: yup.string().required(),
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

	async ValidateSellCrypto( req, res, next ) {

		const bodyValidator = yup.object().shape({
			value: yup.number().required(),
		});

		const headersValidator = yup.object().shape({
			session_id: yup.string().required(),
		});

		const paramsValidator = yup.object().shape({
			stable_coin: yup.string().required(),
			crypto_coin: yup.string().required(),
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

export default new CryptoRequest;