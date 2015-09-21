var url = require('url'),
	routeMap = require('./routeMap'),
	Router = require('./Router');

module.exports = function() {
	return function (request, response) {
		// add response function to response object
		response.json = function (status, body) {
			// default body to empty string
			body = body ? JSON.stringify(body) : '';
			
			// Assume all responses will be in JSON
			response.setHeader("Content-Type", "application/json");
			response.writeHead(status);
			response.write(body);
			response.end();
		};

		// Set up headers to allow CORS
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, DELETE");

		// Allow options request
		if (request.method === "OPTIONS") {
			return response.json(200);
		}

		// Get request body
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            if (body) {
            	try {
            		body = JSON.parse(body);
            	} catch (e) {
            		return response.json(400, {
            			error: 'Request body must be valid JSON.'
            		});
            	}	
            }

            // Set body for later use
            request.body = body;

            // Create a router with our routeMap
            var router = new Router(routeMap);

            // Have router process the request
            router.route(request, response);
        });
	};
};