var config = require('../config'),
	SessionHandler = require('../models/SessionHandler');

// Login method
exports.login = function (request, response) {
	if (request.body &&
		request.body.email === config.login.email &&
		request.body.password === config.login.password) {

		var sessionHandler = new SessionHandler();
		sessionHandler.append({}, function (err, json) {
			response.json(200, {
				sessionId: json.id
			});	
		});
	} else {
		response.json(400, {
			error: 'Login attempt failed.'
		});
	}
}

// Logout method
exports.logout = function (request, response) {
	if (request.headers['x-session-id'] !== request.params.id) {
		return response.json(403, {
			error: 'You don not have access to this resource.'
		});
	}

	var sessionHandler = new SessionHandler();
	sessionHandler.remove(request.params.id, function (err) {
		if (err) {
			return response.json(500, {
				error: 'Something went wrong.'
			});
		}

		response.json(204);
	});
}
