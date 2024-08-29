# Node JS Assignment: School Management API

## Objective
This project involves creating a set of APIs using Node.js, Express.js, and MySQL to manage school data. The system allows users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location.

## Features

### 1. Add School API
- **Endpoint**: `/addSchool`
- **Method**: `POST`
- **Payload**: 
  - `name` (string)
  - `address` (string)
  - `latitude` (float)
  - `longitude` (float)
- **Functionality**: 
  - Validates the input data.
  - Adds a new school to the `schools` table in the MySQL database.
  - Ensures all fields are properly validated before insertion.

### 2. List Schools API
- **Endpoint**: `/listSchools`
- **Method**: `GET`
- **Parameters**: 
  - `latitude` (float)
  - `longitude` (float)
- **Functionality**: 
  - Fetches all schools from the database.
  - Sorts them based on proximity to the provided user coordinates.
  - Returns the sorted list of schools.

## Project Setup

### Prerequisites
- [Docker](https://www.docker.com/)

### Installation & Running

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Pankajs53/educase-intern-task.git
   cd educase-intern-task

2. ## Docker Setup:

I've created a `docker-compose.yml` file that sets up both the Node.js application and MySQL database.  
This eliminates the need for separate hosting services, making it easy to run the entire setup locally.

## Run the project:

## Start the project with Docker:

  ```bash
  docker-compose up

  This command will pull the necessary Docker images, set up the MySQL database, and start the Node.js application.

## Access the APIs:
The APIs will be accessible at http://localhost:4000.

### API Documentation
You can test the APIs using the provided Postman collection. The collection includes example requests and documents expected responses.

### Testing
Use the following Postman collection to test the APIs:

### Notes
Initially, we aimed to host the project online. However, due to the lack of a free MySQL hosting service, we opted for a Docker-based setup. This approach ensures that the entire system (Node.js and MySQL) can be easily run and tested locally with a single command.


