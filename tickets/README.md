# Tickets Service

Is responsible for managing everything related to tickets. It provides several routes to handle ticket management.

## Events

#### ORDER-CREATED

This service listens for **ORDER-CREATED** events, updates the order attribute in the ticket record to the order id and emits a new event called **TICKET-UPDATED**.

#### ORDER-CANCELLED

This service listens for **ORDER-CANCELLED** events, updates the order attribute in the ticket record to "undefined" and emits a new event called **TICKET-UPDATED**.

## Routes

#### `GET /api/tickets`

Returns all available tickets that do not have an associated order. This allows anyone to view the data without needing to log in to the application.

#### `GET /api/tickets/:id`

Returns the data of a specific ticket by filtering by ID.

#### `POST /api/tickets`

Creates a new ticket. The user must be logged in and provide a title and price for the ticket. Then, it emits a new event called **TICKET-CREATED** to notify other services that a new ticket has been created.

#### `PUT /api/tickets/:id`

Updates the status of a ticket if the ticket has not been previously reserved. Then, it emits a new event called **TICKET-UPDATED** to notify other services that the ticket has been updated.
