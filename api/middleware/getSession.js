var SessionHandler = require('../models/SessionHandler');

module.exports = function (request, response, next) {
	var sessionHandler = new SessionHandler();
	sessionHandler.read(function (err, data) {
		if (err) {
			return response.json(500, {
				error: 'Something went wrong.'
			});
		}

		// Check if a valid session was passed in
		var sessionId = request.headers['x-session-id'];
		if (!data[sessionId]) {
			return response.json(401, {
				error: 'A session is required for this route.'
			})
		}

		next();
	});
};