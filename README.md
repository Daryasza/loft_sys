# Corporate portal

This is a REST API + WebSocket server application that represents the backend part of the corporate system. The frontend part can be found [here](https://github.com/satansdeer/loftschool-nodejs-project)

## DB

The MongoDB should be running in order to store application data.

Several ways can be used to deploy the DB, but the Docker way will be used as an example

0. Docker should be [installed](https://docs.docker.com/get-docker/)
1. Run Mongo image with the following commands (all the names and passwords should be replaced with your own values):
   ~~~bash
   $ docker run -d --name mongo \
     -e MONGO_INITDB_DATABASE=loft \
     -e MONGO_INITDB_ROOT_USERNAME=user \
     -e MONGO_INITDB_ROOT_PASSWORD=pass \
     -p 27017:27017 mongo
   ~~~
2. Connect to the MongoDB and create a user with read & writerights to the `loft` database:
   ~~~bash
   $ docker exec -it mongo \
     mongosh "mongodb://user:pass@127.0.0.1:27017/loft?authSource=admin"

     # ...
     # The connection information should appear here
     # ...

   loft> db.createUser(
      {
        user: "loft",
        pwd: "loft",
        roles: [
          {
            role: "readWrite",
            db: "loft"
          }
        ]
      }
    )

   loft> exit
   ~~~

## Server

### Configure

The following environment variables can be used to configure the API server *(the default value will be used if no custom value provided)*:

- `APP_HOST` - app listen host (default: `0.0.0.0`)
- `APP_PORT` - app listen port (default: `8080`)
- `DB_HOST` - specify DB host (default: `127.0.0.1`)
- `DB_PORT` - specify DB port (default: `27017`)
- `DB_NAME` - set DB name (default: `loft`)
- `DB_USER` - set DB user (default: `loft`)
- `DB_PASS` - set DB password (default: `loft`)
- `APP_ACCESS_TOKEN_LIFETIME` - duration of the access token in ms (default: `600000`)
- `APP_REFRESH_TOKEN_LIFETIME` - duration of the refresh token in ms (default: `1800000`)
- `REQUESTER_URL` - URL to be allowed for CORS in socket.io (default: `http://127.0.0.1:8080`)

### Install JS dependencies

~~~bash
$ npm install
~~~

### Running

~~~bash
$ DB_HOST=127.0.0.1 \
  DB_PORT=27017 \
  # other required environment variables
  # in the format:
  # KEY=VALUE \
  node server.js
~~~

## API Doc

GET `/api/news`

Get the list of news

POST `/api/news`

Create the news

PATCH `/api/news/:id`

Update an existing news by ID

DELETE `/api/news/:id`

Delete an existing new by ID
