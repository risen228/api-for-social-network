# API For Social Network

## Developing

Prerequisites:

- [Docker](https://www.docker.com/get-started)

Running locally:

1. Create `.env` file: `cp .env.example .env`
   - You may need to fill/change some variables

2. Launch postgres: `yarn start:docker`
   - After finishing development, you can shut down the containers by running `yarn stop:docker`

3. Wait for docker containers to start up

4. Create and migrate the database: `yarn prisma migrate dev`
   - You must run this command every time you make changes to `prisma/schema.prisma`

5. Run the application in watch mode: `yarn start:dev`

6. Congratulations! Now you can access the API on `http://localhost:5050`

## API Reference (in progress)

Swagger UI - `/api`

OpenAPI JSON - `/api-json`