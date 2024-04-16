# Book library

App for managing books in library.

## Prerequisites

You must have following software installed on your machine:

- [docker](https://docs.docker.com/engine/install/)
- [node.js](https://nodejs.org/en)
- [pnpm](https://pnpm.io/installation)

## Repository structure

This repository is structured as a [nx](https://nx.dev/) monorepo. It consists of three main parts:

- [server](apps/server/README.md)
- [browser](apps/browser/README.md)
- [shared](shared/README.md)

## Before start

Before running app you should start database container, using docker compose:

```sh
docker compose up -d
```

## Running app

To run app, use nx commands eg. `pnpm nx run-many -t serve`.

## Endpoints documentation

Documentation using `swagger-ui` is available at [http://localhost:3000/documentation](http://localhost:3000/documentation) endpoint.
