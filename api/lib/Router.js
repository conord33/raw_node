var url = require('url'),
	querytring = require('querystring');

function Router (routes) {
	this.routes = routes;
}

Router.prototype.matchRoute = function (request) {
	var requestUrl = url.parse(request.url);

	// Add query params
	request.queryParams = querytring.parse(requestUrl.query);
	// Add params object to request object
	request.params = {};

	// Get request method and path array
	var method = request.method;
	var pathArr = requestUrl.pathname.split('/');
	pathArr.shift();
	
	var keyPathArr, keyMethod;
	for (var key in this.routes) {
		// Get route key method and path arr
		keyPathArr = key.split('/');
		keyMethod = keyPathArr.shift();
		
		if (method === keyMethod && keyPathArr.length === pathArr.length) {
			var match = true;
			for (var i = 0; i < pathArr.length; ++i) {
				// if path part is a param store the param
				if (keyPathArr[i][0] === ":") {
					request.params[keyPathArr[i].substr(1)] = pathArr[i];
				} else if (keyPathArr[i] !== pathArr[i]) {
					// if the path parts dont match set match to false
					match = false;
				}
			}

			// If match is still true return the route
			if (match) {
				// Need to return a deep copy of the array
				return this.routes[key].slice(0);
			}
		}

	}

	// Return null if nothing is found
	return null;
}

// Execute the correct route based on the request
Router.prototype.route = function (request, response) {
	// Get the correct route to follow
	var funcArr = this.matchRoute(request);
	// If not route found return 404
	if (!funcArr) {
		response.json(404, {
			error: "Route not found."
		});
	} else {
		var next = function () {
			if (funcArr.length > 0) {
				var func = funcArr.shift();
				func(request, response, next);
			}

			return null;
		}

		next();
	}
}

module.exports = Router;