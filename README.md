### Backend Starter

### Setup dotenv file

`cp .env.example .env`

### Building required Docker containers

`docker compose up -d`

### Install Dependencies

`yarn`

### Migrations

`yarn migrate dev --name my_descriptive_changes`

e.g `yarn migrate dev --name add-user-model`

to execute the migration

### Running

API Server (Watch Mode)

`yarn api:dev`

Webhook Server (Watch Mode)

`yarn webhook:dev`
