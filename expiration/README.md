# Expiration Service

Is responsible for controlling the expiration of an order and emitting an event when the time that the user has to pay a ticket ends. The service uses Bull for managing the expiration of orders. **Bull** is a Node.js library that implements a fast and robust queue system for processing jobs. It uses Redis for managing queues and workers, and it is designed to handle large volumes of jobs and provide high reliability and performance.

## Events

This service listens for **ORDER-CREATED** events. When a new event occurs, it waits for a specified amounf of time (expiration time) and then emits a new event called **EXPIRATION-COMPLETE**.
