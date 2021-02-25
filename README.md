# secured-jwt-authentication
A secured way to implement token based authentication in React

## Server

The server side consists up of:
- Express server
- Apollo server wrapping express app
- Postgres database connected using typeORM

### How to setup
- Go to `server/`
- Hit `yarn`
- Fill up postgres credentials in typeORM config located at `ormconfig.json`
- Hit `yarn start`
- Get a message `Express server has been started`

## Client

The client is mostly React, written in TypeScript. Also uses an ApolloClient wrapped
around the react app as `ApolloProvider` to manipulate web requests and httpLinks.

### How to setup
- Go to `web/`
- Install dependencies using `yarn`
- Hit `yarn start`

## Tips and tricks
- To generate graphQL, create a new graphql file under `src/graphql` and hit `yarn generate`.
  It uses the @graphql-codegen generator to generate queries and mutations automatically.
