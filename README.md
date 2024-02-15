# Weather App

This README file provides an overview of the Weather App project. It explains the purpose of the application and the
reasons behind the choice of technologies used, including Projen, Hexagonal Architecture, TypeScript, and DynamoDB.

## Project overview

The project has 3 different parts, two of which have their own setup:

- Infrastructure as Code: this part is responsible for describing and provisioning the infrastructure necessary to run the application `./src/main.ts`
- Backend: this is a TypeScript sub-project where the backend application lives. `./backend/src`
- Frontend: another sub-project, this time for an SPA built with React. `./frontend/src`

### IAC

This is where the infrastructure is defined. It uses AWS CDK to define the resources that the application needs to run.
The most relevant resources are:

- Lambda with API Gateway to serve the endpoints
- Dynamodb to store the data
- S3 bucket to store the frontend code
- CloudFront to work as a CDN for the frontend. It also provides SSL and proxies the API Gateway requests

### Backend

It's developed following hexagonal architecture (Ports and adapters). There is only one service, `weather-service`, with 2 drivers for serving the requests, one for serving data and another for ingesting data, and one driven to retrieve and store the data.

This architecture allows to create new ports, new adapters and new services, decoupling the code. Some examples:

- You could add a new driven port, `for-fetching-data`, that allows ingest data using and external website that serve the metrics. And a driver port to trigger a function that retrieve the data and store it
- Add a new adapter, `weather-repository-aurora-adapter`, that allow changing the database without affecting the application bussines
- Add a new service, `news-service`, `users-service`, `notifications-service`... bringing more functionalities to the API not related with the weather

### Frontend

This code utilizes React to create interactive UI components, trpc to define and handle API requests and responses in a type-safe manner, and react-query to manage and cache data fetching from the API.

## Technologies

### Why Hexagonal Architecture?

Hexagonal Architecture, also known as Ports and Adapters Architecture, is a software design pattern that promotes loose coupling and separation of concerns. It allows for easier testing, maintainability, and scalability. We chose Hexagonal Architecture for this project to achieve a modular and flexible design that can adapt to changing requirements.

### Why monorepo with Projen?

Projen is a development tool that simplifies project setup and configuration. It provides a declarative approach to define project infrastructure, dependencies, and build pipelines. We chose Projen for this project to streamline the development process and ensure consistent project structure.

### Why TypeScript?

There are some benefits on using the same language for the 3 projects. Mostly the posibility of sharing code and types. It provides better tooling, improved code quality, and enhanced developer productivity.

### Why NoSQL instead of RDBMS?

If offers scalability and performance optimizations out of the box, ensuring consistent performance regardless of data volume. With a pay-as-you-go pricing model, DynamoDB can be more cost-effective than maintaining and scaling a traditional SQL database for small-scale projects.

## Installation and contributing

All the instructions are placed in the CONTRIBUTING file

## Project structure

```
.
├── README.md
├── backend
│   ├── src
│   │   └── weather-service
│   │       ├── adapters
│   │       │   ├── driven
│   │       │   └── driver
│   │       ├── app
│   │       │   ├── schemas.ts
│   │       │   ├── models.ts
│   │       │   └── weatherService.ts
│   │       ├── composition-root.ts
│   │       └── ports
│   │           ├── driven
│   │           └── driver
├── frontend
│   ├── package.json
│   ├── public
│   ├── src
│   │   ├── App.tsx
│   │   ├── components
├── package.json
├── src
│   └── main.ts
└── tsconfig.json
```
