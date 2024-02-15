# Weather App

This README file provides an overview of the Weather App project. It explains the purpose of the application and the reasons behind the choice of technologies used, including Projen, Hexagonal Architecture, TypeScript, and DynamoDB.

## Project overview

The project has 3 different subprojects, IAC, backend and frontend. The code it's distributed in 3 folders:

- src/main.ts -> IAC code
- backend/src
- frontend/src

### IAC

All the infrastructure needed to set up the project, using CDK the code is easly deployed in any AWS account.

- Lambda with API Gateway to serve the endpoints
- Dynamodb to store the data
- Cloudfront and S3 to serve the frontend code

### Backend

It's developed following hexagonal architecture (Ports and adapters). There is only one service, weather-service, with 2 drivers for serving the requests and one driven to store the data.

This architecture allows to create new ports, new adapters and new services, decoupling the code. Some examples:

- Adding a new driven port, for-fetching-data, that allows ingest data using and external website that serve the metrics. And a driver port to trigger a function that retrieve the data and store it
- Add a new adapter, weather-repository-aurora-adapter, that allow changing the database without affecting the application bussines
- Add a new service, news-service, users-service, notifications-service... bringing more functionalities to the API not related with the weather

### Frontend

This code utilizes the power of React to create interactive UI components, trpc to define and handle API requests and responses in a type-safe manner, and react-query to manage and cache data fetching from the API.

## Technologies

### Why Hexagonal Architecture?

Hexagonal Architecture, also known as Ports and Adapters Architecture, is a software design pattern that promotes loose coupling and separation of concerns. It allows for easier testing, maintainability, and scalability. We chose Hexagonal Architecture for this project to achieve a modular and flexible design that can adapt to changing requirements.

### Why monorepo with Projen?

Projen is a development tool that simplifies project setup and configuration. It provides a declarative approach to define project infrastructure, dependencies, and build pipelines. We chose Projen for this project to streamline the development process and ensure consistent project structure.

### Why TypeScript?

There are some benefits on using the same language for the 3 projects. Mostly the posibility of sharing code and types. It provides better tooling, improved code quality, and enhanced developer productivity.

### Why DynamoDB instead of SQL?

If offers scalability and performance optimizations out of the box, ensuring consistent performance regardless of data volume. With a pay-as-you-go pricing model, DynamoDB can be more cost-effective than maintaining and scaling a traditional SQL database for small-scale projects.

## Installation and contributing

All the instructions are placed in the CONTRIBUTING file
