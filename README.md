# Book library

App for managing books in library.

## Prerequisites

You should have following software installed on your machine:

- [docker](https://docs.docker.com/engine/install/)
- [node.js](https://nodejs.org/en) (preferably using [volta](https://docs.volta.sh/guide/getting-started))

## Before start

Before running app you should start database container, using docker compose:

```sh
docker compose up -d
```

## Start app

To start app, use command scripts available in [package.json](package.json#L10) file.

## Endpoints documentation

Documentation using `swagger-ui` is available at `/documentation` endpoint.
