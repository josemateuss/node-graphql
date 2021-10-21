# GraphQL Studies

This repo was created with focus at my studies about GraphQL.
<p align="left"> <a href="https://graphql.org" target="_blank"> <img src="https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg" alt="graphql" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> </p>

## Stack

- Node
    - Apollo Server (spec-compliant GraphQL server)
    - JSON Server (to simulate an API Rest)
- GraphQL
- SQLite (still working in another datasource)

## Setup

```
# Cloning project
git clone https://github.com/josemateuss/node-graphql.git
cd node-graphql

# Installing dependencies
npm install
```

## Running Project

```
# Running JSON Server in http://localhost:3000
npx json-server --watch api/data/data.json

# Running Project in http://localhost:4000 (GraphQL Playground)
npm start
```

## GraphQL Queries and Mutations

### Find all users:

``` graphql
query {
  users {
    name
    active
    email
    age
    height
    role {
      type
    }
    phones {
      number
    }
  }
}
```

### Find a specific user:

``` graphql
query {
  user(id: 7) {
    name
    active
    email
    age
    height
    role {
      type
    }
    phones {
      number
    }
  }
}
```

### Register an user:

``` graphql
mutation {
  registerUser(
    user: {
      name: "José Mateus"
      active: true
      email: "mateus@git.com"
      age: 25
      height: 174
      role: COORDINATION
      phones: [{ number: "(61) 99432-1000" }, { number: "(61) 3333-4444" }]
      createdAt: "2020-10-21"
    }
  ) {
    name
  }
}
```

### Update an user:

``` graphql
mutation {
  updateUser(
    id: 7
    user: {
      name: "José Mateus"
      active: true
      email: "mateus@github.com"
      age: 25
      height: 174
      role: STUDENT
      phones: [{ number: "(61) 99432-1000" }, { number: "(61) 99999-9999" }]
    }
  ) {
    code
    message
    user {
      name
    }
  }
}
```

### Delete an user:

``` graphql
mutation {
  deleteUser(id: 7) {
    code
    message
  }
}
```