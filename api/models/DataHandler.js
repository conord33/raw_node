var fs = require('fs'),
	crypto = require('crypto');

function DataHandler (file) {
	this.file = file;
}

// Get contents of json file
DataHandler.prototype.read = function (cb) {
	fs.readFile(this.file, 'utf8', function (err, data) {
		// if file has not been created initialize data as empty array
		if (err && err.code === 'ENOENT') {
			data = {};
		} else if (err) {
			return cb(err);
		}

		// try to parse contents as json
		try {
			data = JSON.parse(data);
		} catch (e) {
			// if there is an error set object to empty object
			data = {};
		}

		cb(null, data);
	});
};

// Write contents to file
DataHandler.prototype.write = function (json, cb) {
	json = JSON.stringify(json);
	fs.writeFile(this.file, json, function (err) {
		if (err) {
			return cb(err);
		}

		cb();
	});
};

// Return an item by its key
DataHandler.prototype.retrieve = function (key, cb) {
	var _this = this;
	// Get the list of sessions
	this.read(function (err, data) {
		if (err) {
			return cb (err);
		}

		// Return single item based on key
		cb(null, data[key]);
	});
}

// Append object to file with unique id
DataHandler.prototype.append = function (json, cb) {
	var _this = this;
	// get current data in file
	this.read(function (err, data) {
		if (err) {
			return cb(err);
		}

		// default to empty object
		json = json || {};

		// generate id for object
		var id = _this.generateId();
		while (data[id]) {
			id = _this.generateId();
		}

		// add the id to the object
		json.id = id;

		// insert the javascript with its key
		data[id] = json;

		// write updated data to the file
		_this.write(data, function (err) {
			if (err) {
				return cb(err);
			}

			cb(null, json);
		});
	});
}

// Updates an item based on its key
DataHandler.prototype.update = function (key, json, cb) {
	var _this = this;
	// Get the list of sessions
	this.read(function (err, data) {
		if (err) {
			return cb (err);
		}

		// return nothing if the key is not found
		if (!data[key]) {
			cb(null, null);
		}

		// Remove item by key
		data[key] = json;

		// Write new session array back to filee
		_this.write(data, function (err) {
			if (err) {
				return cb (err);
			}

			cb(null, json);
		});
	});
} 

// Remove an item by its key
DataHandler.prototype.remove = function (key, cb) {
	var _this = this;
	// Get the list of sessions
	this.read(function (err, data) {
		if (err) {
			return cb (err);
		}

		// Remove item by key
		delete data[key];

		// Write new session array back to filee
		_this.write(data, function (err) {
			if (err) {
				return cb (err);
			}

			cb();
		});
	});
} 

// Generates a random id
DataHandler.prototype.generateId = function () {
	var current_date = (new Date()).valueOf().toString();
	var random = Math.random().toString();
	return crypto.createHash('sha1').update(current_date + random).digest('hex');
}

module.exports = DataHandler;