# Node.js with NGINX, Ansible, and Supervisor

This is a very basic node api that does not use any node modules.  It is an 
exercise in building a node api from scratch and the deployment tools involved
in creating a production level app.

Ansible is used to provision a vagrant box to run `x` number of node processes
load balanced by nginx and managed by supervisor.

## Running the API

Runing `vagrant up` in the project directory should spin up a vagrant box
listening on `localhost:8080`.

## Configuration API
This API can be run by executing `node index.js`.
This API leverages the file system as a database since no third party
modules were allowed for this challenge.  This limitation would prevent
the API from scaling as each instance would have its own "database".

### Endpoints

#### POST /sessions
This endpoint allows a user to log in.  There is only one user that is hard
coded in the `config.js` file.  If the correct email and password are provided
a sessionId will be returned allowing the user to access the rest of the API.
Sample body:
```
{
	"email": "test@gmail.com",
	"password": "password"
}
```

#### DELETE /sessions/:id
This will log the user out by deleting the sessionId they pass in.

#### POST /configurations
This creates a new configuration. An id will also be assigned to the newly
created configuration.
Sample body:
```
{
    "name": "hosasdfadffst1",
    "hostname": "nessus-ntp.lsdafsdfdsab.com",
    "port": "12asdfasd34",
    "username": "toasdfasdfto"
}
```

#### GET /configurations?offset=0&limit=20&sortBy=name
This returns a flat array of configurations.  The results can be paged by using
the `offset` and `limit` query params. They can also be sorted by using the 
`sortBy` query param with a property of the configuration object.

#### GET /configurations/:id
This returns a single configuration by its id.

#### PUT /configurations/:id
This updates a configuration by its `id`.  The `id` can not be modified and is 
ignored if passed in the body.
Sample body:
```
{
    "name": "hosasdfadffst1",
    "hostname": "nessus-ntp.lsdafsdfdsab.com",
    "port": "12asdfasd34",
    "username": "toasdfasdfto"
}
```
