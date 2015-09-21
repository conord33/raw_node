//Lets require/import the HTTP module
var http = require('http'),
	config = require('./config'),
	requestHanlder = require('./lib/requestHandler');

//Create a server with routing
var server = http.createServer(requestHanlder());

//Lets start our server
server.listen(config.port, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", config.port);
});