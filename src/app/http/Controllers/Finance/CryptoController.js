// Repository
import Repository from "../../Repositorys/Finance/CryptoRepository.js";

// Helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
import ResponseHelper from "../../../Helper/ResponseHelper.js";
import AuthLoginHelper from "../../../Helper/Client/AuthLoginHelper.js";
import FinanceHelper from "../../../Helper/Finance/FinanceHelper.js";
import CryptoHelper from "../../../Helper/Finance/CryptoHelper.js";

class CryptoController {

	async BuyCrypto(req, res) {
		const { session_id } = req.headers;
		const { stable_coin, crypto_coin } = req.params;
		const { value } = req.body;

		const getSession = await AuthLoginHelper.ExistSession(session_id);
		
		if (! getSession )
			return ResponseHelper.unprocessableEntity( res, { error: "your session is invalid" } );

		const getUser = await ClientHelper.ExistEmail(getSession.email);

		if (! getUser)
			return ResponseHelper.unprocessableEntity( res, { error: "the email provided is invalid" } );

		if (! FinanceHelper.verifyStableCoin(stable_coin))
			return ResponseHelper.badRequest( res, { error: "it was not possible to proceed as the currency entered is invalid" } );

		if (! CryptoHelper.verifyCryptoCoin(crypto_coin))
			return ResponseHelper.badRequest( res, { error: "it was not possible to proceed as the currency entered is invalid" } );

		const getWallet = await FinanceHelper.GetWallet(getUser.email);

		if (value < 5 )
			return ResponseHelper.badRequest( res, { error: "the deposit value cannot be less than 5" } );

		const totalCrypto = await CryptoHelper.getPrice(crypto_coin, stable_coin, value);

		const sum = await CryptoHelper.sum(crypto_coin, stable_coin, getWallet, value);

		const sub = CryptoHelper.sub(stable_coin, getWallet, value);

		if (! sub )
			return ResponseHelper.unprocessableEntity( res, { error: "you dont have enough money for that" } );

		const Update = await new Repository(getUser.email, stable_coin, crypto_coin, sub, sum, value, totalCrypto).BuyCryptoAndCreateLog();

		if ( Update )
			return ResponseHelper.success( res, Update );

		return ResponseHelper.badRequest( res, { error: "unable to process your request, please try again" } );
	} 

	async SellCrypto(req, res) {
		const { session_id } = req.headers;
		const { stable_coin, crypto_coin } = req.params;
		const { value } = req.body;

		const getSession = await AuthLoginHelper.ExistSession(session_id);
		
		if (! getSession )
			return ResponseHelper.unprocessableEntity( res, { error: "your session is invalid" } );

		const getUser = await ClientHelper.ExistEmail(getSession.email);

		if (! getUser)
			return ResponseHelper.unprocessableEntity( res, { error: "the email provided is invalid" } );

		if (! FinanceHelper.verifyStableCoin(stable_coin))
			return ResponseHelper.badRequest( res, { error: "it was not possible to proceed as the currency entered is invalid" } );

		if (! CryptoHelper.verifyCryptoCoin(crypto_coin))
			return ResponseHelper.badRequest( res, { error: "it was not possible to proceed as the currency entered is invalid" } );
	
		const getWallet = await FinanceHelper.GetWallet(getUser.email);

		const sum = await CryptoHelper.sum2(crypto_coin, stable_coin, getWallet, value);
	
		const sub = await CryptoHelper.sub2(crypto_coin, getWallet, value);

		const Update = await new Repository(getUser.email, stable_coin, crypto_coin, sub, sum, value).SellCryptoAndCreateLog();

		if ( Update )
			return ResponseHelper.success( res, Update );

		return ResponseHelper.badRequest( res, { error: "unable to process your request, please try again" } );
	}
}

export default new CryptoController;