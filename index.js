const Client= require('./Structures/Client');
const config = require('./config.json');
require("dotenv").config();
const client = new Client(config);
client.start();

