require('dotenv').config();
const config = require('./config');
const app = require('./app');
const port = config.server.port || 3000;

app.listen(port, () => {
	console.log(`Running on port ${port}`);
});
