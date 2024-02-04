# Book library

App for managing books in library.

## Prerequisites

You must have following software installed on your machine:

- [docker](https://docs.docker.com/engine/install/)
- [node.js](https://nodejs.org/en)
- [pnpm](https://pnpm.io/installation)

## Repository structure

This repository is structured as a monorepo, thanks to pnpm workspace feature. It consists of three main parts:

- [server](server/README.md)
- [browser](browser/README.md)
- [shared](shared/README.md)

## Before start

Before running app you should start database container, using docker compose:

```sh
docker compose up -d
```

## Start app

To start app, use command scripts available in [package.json](package.json#L5) file.

## Endpoints documentation

Documentation using `swagger-ui` is available at [http://localhost:3000/documentation](http://localhost:3000/documentation) endpoint.
