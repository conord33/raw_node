var config = require('../config'),
	ConfigurationHandler = require('../models/ConfigurationHandler');

// Login method
exports.create = function (request, response) {
	if (request.body &&
		request.body.name &&
		request.body.hostname &&
		request.body.port &&
		request.body.username) {

		var configurationHandler = new ConfigurationHandler();
		configurationHandler.append(request.body, function (err, json) {
			response.json(200, json);
		});		
	} else {
		response.json(400, {
			error: 'Invalid request.'
		});
	}
}

// Retrun the collection.  This provides different sort options and paging.
exports.collection = function (request, response) {
	var configurationHandler = new ConfigurationHandler();
	configurationHandler.read(function (err, json) {
		if (err) {
			return response.json(500, {
				error: 'Something went wrong.'
			});
		}

		// create a flat array of configurations
		var configArr = [];
		for (var key in json) {
			configArr.push(json[key]);
		}

		// sort the array of configurations
		configArr.sort(function (a, b) {
			if (a[request.queryParams.sortBy] < b[request.queryParams.sortBy])
		    	return -1;
		  	if (a[request.queryParams.sortBy] > b[request.queryParams.sortBy])
		    	return 1;
		  	return 0;
		});

		// slice the array based on offset and limit
		var offset = request.queryParams.offset || 0;
		var limit = request.queryParams.limit || 20;

		response.json(200, configArr.slice(offset, limit));
	});
}

// Return a configuration based on its id
exports.retrieve = function (request, response) {
	var configurationHandler = new ConfigurationHandler();
	configurationHandler.retrieve(request.params.id, function (err, json) {
		if (err) {
			return response.json(500, {
				error: 'Something went wrong.'
			});
		}

		// Return 404 if nothing is found
		if (!json) {
			return response.json(404, {
				error: 'Configuration not found.'
			});
		}

		response.json(200, json);
	});
}

// Return a configuration based on its id
exports.update = function (request, response) {
	if (request.body &&
		request.body.name &&
		request.body.hostname &&
		request.body.port &&
		request.body.username) {

		// Make sure id is not changed
		var json = request.body;
		json.id = request.params.id;

		// Update the resource
		var configurationHandler = new ConfigurationHandler();
		configurationHandler.update(request.params.id, json, function (err, json) {
			if (err) {
				return response.json(500, {
					error: 'Something went wrong.'
				});
			}

			// Return 404 if nothing is found
			if (!json) {
				return response.json(404, {
					error: 'Configuration not found.'
				});
			} 

			response.json(200, json);
		});		
	} else {
		response.json(400, {
			error: 'Invalid request.'
		});
	}
}

// Remove a configuration based on its id
exports.remove = function (request, response) {
	var configurationHandler = new ConfigurationHandler();
	configurationHandler.remove(request.params.id, function (err) {
		if (err) {
			return response.json(500, {
				error: 'Something went wrong.'
			});
		}

		response.json(204);
	});
}