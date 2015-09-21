var routes = require('../routes'),
	middleware = require('../middleware');

/*
	More specific routes need to come before those with parameters do to 
	short circuit route matching strategy.

	e.g.
		GET/configurations/search
		GET/configurations/:id

	If GET/configurations/:id comes first, GET /configurations/search will
	always match GET/configurations/:id.
*/

module.exports = {
	// Session routes
	'POST/sessions': [routes.sessions.login],
	'DELETE/sessions/:id': [
		middleware.getSession,
		routes.sessions.logout
	],

	// Configuration routes
	'POST/configurations': [
		middleware.getSession,
		routes.configurations.create
	],
	'GET/configurations': [
		middleware.getSession,
		routes.configurations.collection
	],
	'GET/configurations/:id': [
		middleware.getSession,
		routes.configurations.retrieve
	],
	'PUT/configurations/:id': [
		middleware.getSession,
		routes.configurations.update
	],
	'DELETE/configurations/:id': [
		middleware.getSession,
		routes.configurations.remove
	],
};