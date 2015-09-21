var DataHandler = require('./DataHandler'),
	path = require('path'),
	util = require('util');


function SessionHandler () {
	SessionHandler.super_.call(this);
	this.file = path.join(__dirname, '../.data/sessions.json');
}

util.inherits(SessionHandler, DataHandler);

module.exports = SessionHandler;