# Weather App

This README file provides an overview of the Weather App project. It explains the purpose of the application and the reasons behind the choice of technologies used, including Projen, Hexagonal Architecture, TypeScript, and DynamoDB.

## Technologies

### Why Hexagonal Architecture?

Hexagonal Architecture, also known as Ports and Adapters Architecture, is a software design pattern that promotes loose coupling and separation of concerns. It allows for easier testing, maintainability, and scalability. We chose Hexagonal Architecture for this project to achieve a modular and flexible design that can adapt to changing requirements.

### Why CDK?

### Why Projen?

Projen is a development tool that simplifies project setup and configuration. It provides a declarative approach to define project infrastructure, dependencies, and build pipelines. We chose Projen for this project to streamline the development process and ensure consistent project structure.

### Why TypeScript?

TypeScript is a statically typed superset of JavaScript that adds optional type annotations. It provides better tooling, improved code quality, and enhanced developer productivity. We chose TypeScript for this project to leverage its strong typing and modern language features.

### Why DynamoDB?

DynamoDB is a fully managed NoSQL database service provided by AWS. It offers scalability, high availability, and low latency. We chose DynamoDB for this project to store and retrieve weather data efficiently, ensuring fast and reliable access.

## Project overview

The project has 3 different subprojects, IAC, backend and frontend. The code it's distributed in 3 folders:

- src/main.ts -> IAC code
- backend/src
- frontend/src

### IAC

All the infrastructure needed to set up the project:

- Lambda with API Gateway to serve the endpoints
- Dynamodb to store the data
- Cloudfront and S3 to serve the frontend code

### Backend

Using hexagonal architecture (Ports and adapters). There is only one service (Hexagon), weather-service, with 2 drivers for serving the requests and one driven to store the data.
This architecture allows to create new ports to the serviceservices, for example a repository to handle da
