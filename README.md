# Commands

## First, on the server folder:

### `npm i`

Installs dependencies for the server.

### `npm run seed`

Populates the db with data (make sure mongo service is running first).

### `npm start`

Runs the server locally

## Then, on the client folder:

### `npm i`

Installs dependencies for the client.

### `npm start`

Runs the client locally

## In the source folder 

### `docker-compose up`

Deploys a dockerized version of the app.

## Endpoints

### Frontend

### `http://localhost:3000/`

### Backend

### POST `http://localhost:8000/product`

### GET/POST `http://localhost:8000/products`

### GET/PUT/DELETE `http://localhost:8000/product/:id`
