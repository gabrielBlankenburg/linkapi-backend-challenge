const config = require('../config');
const client = require('../clients/currencyConverter');

// Calls the Currency Converter API to get the value in brazilian real
// If the ticker does not exist in the converter it returns the origin value
const convert = async (currency, value) => {
	let ticker = `${currency}_BRL`;

	const currencyFormatter = await client.get(`convert?apiKey=${config.currencyConverter.apiToken}&q=${ticker}&compact=y`);

	let data = currencyFormatter.data;

	if (!data[ticker] || !data[ticker].val) {
		return value;
	}

	return data[ticker].val * value;
}

module.exports = convert;
