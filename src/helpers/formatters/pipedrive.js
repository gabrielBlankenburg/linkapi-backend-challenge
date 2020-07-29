const moment = require('moment-timezone');

// Formats a deal from the Pipedrive API to a json response
const dealToResponse = body => {
	if (!body.data) {
		return [];
	}
	
	let deals = body.data.map(item => {
		let company = {
			name: '',
			email: ''
		};

		let contact = {
			name: '',
			emails: [],
			phone_numbers: []
		};

		if (item.org_id) {
			company = {
				name: item.org_id.name,
				email: item.org_id.cc_email
			};
		}

		if (item.person_id) {
			contact = {
				name: item.person_id.name,
				emails: item.person_id.email,
				phone_numbers: item.person_id.phone,
			};
		}

		return {
			title: item.title,
			value: item.value,
			currency: item.currency,
			won_time: item.won_time,
			company,
			contact
		}
	});

	return deals;
}

// Converts data from the Pipedrive API to a Bling XML
const dealToBlingOrder = body => {
	let leaveDate = '';

	if (body.expected_close_date) {
		leaveDate = `
			<data_saida>
				${moment(body.expected_close_date).format('DD/MM/yyyy')}
			</data_saida>
		`
	}

	let formatted  = `
		<?xml version="1.0" encoding="UTF-8"?>
		<pedido>
			<data>${moment(body.won_time).format('DD/MM/yyyy')}</data>
			${leaveDate}
			<cliente>
				<nome>${body.person_id.name}</nome>
			</cliente>
			<itens>
				<item>
					<codigo>PIPEDRIVE ${body.id}</codigo>
					<descricao>${body.title}</descricao>
					<qtde>1</qtde>
					<vlr_unit>${body.value}</vlr_unit>
				</item>
			</itens>
		</pedido>
	`;

	return formatted;
}

module.exports = { dealToResponse, dealToBlingOrder };
