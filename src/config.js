const config = {
	server: {
		port: process.env.SERVER_PORT
	},
	pipedrive: {
		apiToken: process.env.PIPEDRIVER_TOKEN,
		baseUrl: 'https://api.pipedrive.com/v1/',
		timeout: 1000
	},
	bling: {
		apiToken: process.env.BLING_TOKEN,
		baseUrl: 'https://bling.com.br/Api/v2/',
		timeout: 1000
	},
	mongoose: {
		address: process.env.MONGO_ADDRESS
	},
	currencyConverter: {
		baseUrl: 'https://free.currconv.com/api/v7/',
		apiToken: process.env.CURRENCY_CONVERTER_TOKEN,
		timeout: 1000
	}
};


module.exports = config;
