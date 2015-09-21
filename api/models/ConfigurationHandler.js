var DataHandler = require('./DataHandler'),
	path = require('path'),
	util = require('util');


function ConfigurationHandler () {
	ConfigurationHandler.super_.call(this);
	this.file = path.join(__dirname, '../.data/configurations.json');
}

util.inherits(ConfigurationHandler, DataHandler);

module.exports = ConfigurationHandler;