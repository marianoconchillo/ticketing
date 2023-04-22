# Ticket Selling Application using Microservices Architecture

This is a web application for selling tickets, implemented using a microservices architecture. Each microservice is built using Express JS, Typescript, and MongoDB, while the client-side is implemented using Next JS, Typescript, and Tailwind for Server-Side rendering.

## Overview

![screenshot](/images/desk-1.png)
![screenshot](/images/mobile-1.png)
![screenshot](/images/mobile-3.png)
![screenshot](/images/mobile-4.png)

## Architecture

The microservices architecture allows for easy scaling and maintenance of the application. The microservices are orchestrated using Docker and Kubernetes, and are deployed on GKE. Skaffold is used for development purposes. Communication between the microservices is achieved asynchronously using NATS.

## Code Reusability

The microservices share common code, making it more reusable through an NPM library that has been implemented (common).

## Testing

The application has been thoroughly tested using Jest, ensuring that all functionalities are working correctly.

## Features

- Creation and sale of tickets
- Visualize your orders
- Stripe integration for payment processing
- Expiration time to pay a ticket

## Conclusion

**Inside every service there is a README that describes its functionality.**

This is a robust and scalable application for selling tickets, built using a microservices architecture. It uses a combination of the latest technologies and best practices to ensure that the application is efficient and reliable.
