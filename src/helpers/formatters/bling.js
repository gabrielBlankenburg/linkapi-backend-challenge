// Formats data from the bling api to a json response
const orderToResponse = body => {
	if (!body.retorno || !body.retorno.pedidos) {
		return [];
	}

	return body.retorno.pedidos.map(item => {
		return {
			date: item.pedido.data,
			total_sales: parseFloat(item.pedido.totalvenda).toFixed(2),
			leave_date: item.pedido.dataSaida,
			customer_name: item.pedido.cliente.nome,
			items: formatOrderItems(item.pedido.itens)
		}
	});
}

const formatOrderItems = items => {
	return items.map(item => ({
		description: item.item.descricao,
		quantity: parseInt(item.item.quantidade),
		unity_value: parseFloat(item.item.valorunidade).toFixed(2)
	}));
}

module.exports = { orderToResponse };
