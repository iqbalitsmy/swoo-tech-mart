# Swoo Tech Mart

A full-stack e-commerce application built with **React** and **Spring Boot**. Swoo Tech Mart is a portfolio project focused on practical full-stack development, secure authentication, REST API design, relational database modeling, and real-world shopping workflows.

## Features

### Customer

- User registration and login
- JWT-based authentication
- Product browsing, search, and filtering
- Product categories and product variants
- Shopping cart
- Wishlist
- Checkout and order management
- User profile management
- Responsive user interface

### Administration

- Admin dashboard
- Product management
- Category management
- Order management

> Feature availability may change as development continues.

## Technology Stack

| Area | Technologies |
|---|---|
| Frontend | React, React Router, Axios |
| UI | Tailwind CSS, shadcn/ui, Lucide |
| Data fetching | TanStack Query |
| Forms and validation | React Hook Form, Zod |
| Backend | Java, Spring Boot, Maven |
| Security | Spring Security, JWT |
| Persistence | Spring Data JPA, Hibernate |
| Database | PostgreSQL |
| API documentation | Swagger / OpenAPI |
| Version control | Git, GitHub |

## Authentication

The application uses stateless authentication with Spring Security and JWT.

- The backend authenticates users and issues tokens after successful login.
- The frontend keeps the access token in memory.
- A refresh token is stored in an **HttpOnly cookie**.
- Axios sends authenticated API requests with the access token and includes credentials when required.
- Protected backend endpoints are secured through Spring Security.

## Architecture

The project is divided into two main applications:

```text
swoo-tech-mart/
├── frontend/       # React application
└── backend/        # Spring Boot REST API
```

The frontend communicates with the backend through REST APIs. The backend handles business logic, authentication and authorization, and persistence through Spring Data JPA and PostgreSQL.

## Getting Started

### Prerequisites

Install the following before running the project:

- Java 17
- Maven
- Node.js and npm
- PostgreSQL
- Git

### 1. Clone the repository

```bash
git clone https://github.com/iqbalitsmy/swoo-tech-mart.git
cd swoo-tech-mart
```

### 2. Configure the backend

1. Create a PostgreSQL database for the application.
2. Open the backend application configuration.
3. Set the database URL, username, and password.
4. Configure the JWT keys/secrets and any required integration credentials.
5. Run the Spring Boot application:

```bash
cd backend
./mvnw spring-boot:run
```

On Windows, use:

```powershell
mvnw.cmd spring-boot:run
```

### 3. Configure and run the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

If your frontend or backend uses environment-specific configuration, create the required local configuration files and set the API URL and other values expected by the application.

## API Documentation

The backend uses Swagger / OpenAPI for API documentation. Once the backend is running, open the Swagger UI endpoint configured by the application.

Common Springdoc Swagger UI path:

```text
https://swoo-tech-mart.onrender.com/swagger-ui/index.html
```

The exact URL may differ if the server port or Swagger configuration has been changed.

## Project Goals

This project is intended to demonstrate and improve practical skills in:

- Building a full-stack application
- Designing RESTful APIs
- Implementing authentication and role-based authorization
- Modeling relational data and entity relationships
- Managing frontend server state and API requests
- Implementing e-commerce business workflows
- Organizing maintainable frontend and backend code

## Planned Improvements

- Automated backend and frontend tests
- Email verification and password recovery
- Product reviews and ratings
- Improved inventory management
- Docker-based development and deployment
- CI/CD pipeline
- Redis caching
- OAuth2 social login

## Contributing

This is a personal learning and portfolio project. Suggestions and feedback are welcome.

## License

This project is developed for learning, portfolio, and demonstration purposes.
