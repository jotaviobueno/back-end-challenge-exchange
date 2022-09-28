// Depencies
import axios from "axios";

class APICoinPrice {

	async GetPrice(cryptoName, stableCoin) {
		try {
			const price = await axios.get(`https://economia.awesomeapi.com.br/last/${cryptoName}-${stableCoin}`);

			return price.data;

		} catch (e) {
			return false;
		}
	}

}

export default new APICoinPrice;