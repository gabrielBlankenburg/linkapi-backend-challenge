const config = require('../config');
const pipedriveClient = require('../clients/pipedrive');
const dealModel = require('../models/Deal');
const blingService = require('./Bling');
const moment = require('moment-timezone');
const formatter = require('../helpers/formatters/pipedrive');
const IntegrationError = require('../errors/IntegrationError');
const MongoError = require('../errors/MongoError');
const currencyConverter = require('../helpers/currencyConverter');

class Pipedrive {
	// Get deals from the Pipedrive API filtered by status
	async getDeals(status='all_not_deleted') {
		return pipedriveClient.get(`deals?status=${status}&start=0&api_token=${config.pipedrive.apiToken}`);
	}

	// Get won deals from the Pipedrive API and inserts into the mongodb and the Bling API
	async syncDeals() {
		const deals = await this.getDeals('won')
		.catch(error => {
			throw new IntegrationError('Pipedrive API Error');
		});

		let orderCreatedCount = 0;

		if (!deals.data.data) {
			return {
				quantity_order_created: orderCreatedCount
			};
		}

		let promises = deals.data.data.map(async (item) => {
			let existingDeal = await dealModel.findOne({'pipedriveId': item.id});

			// Prevents duplicating data in the database and in the Bling
			if (existingDeal) {
				return;
			}

			// Converts the currency to BRL since Bling only supports BRL
			if (item.currency != 'BRL') {
				item.value = 
					await currencyConverter(item.currency, item.value);
			}

			let formattedOrder = formatter.dealToBlingOrder(item);

			let response = await blingService.postOrder(formattedOrder);

			if (!response.data.retorno.pedidos || !response.data.retorno.pedidos[0]) {
				throw new IntegrationError('Bling API Error');
			}

			let deal = new dealModel({
				pipedriveId: item.id,
				blingId: response.data.retorno.pedidos[0].pedido.idPedido,
				value: item.value,
				date: moment(item.won_time).format('YYYY-MM-DD')
			});

			await deal.save()
			.catch(error => {
				throw new MongoError('Error while storing a new deal')
			});

			orderCreatedCount++;
		});

		await Promise.all(promises);

		return {
			quantity_order_created: orderCreatedCount
		};
	}
}

module.exports = new Pipedrive();
