const express = require('express');
const routes = require('./routers');
const cors = require('cors');
const mongooseClient = require('./clients/Mongoose');
const errorMiddleware = require('./middlewares/handleError');

const app = express();

mongooseClient.init();

app.use(cors());
app.use(routes);
app.use(errorMiddleware);


module.exports = app;
