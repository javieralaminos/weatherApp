# Getting Started

To get started with contributing, please follow these steps:

1. Clone the repository on GitHub.
2. Install project dependecies `yarn install`
3. Setup project `yarn projen`.

## Local deployment

1. Start the backend server

```
tsx backend/src/server-stub.ts
```

2. Start the frontend, in the frontend folder:

```
cd frontend
yarn dev
```

## AWS deployment

1.  Bootstrap the account you are going to use:

```
npx cdk bootstrap aws://ACCOUNT_ID/eu-west-1
```

2. Deploy the application

```
yarn cdk deploy
```
