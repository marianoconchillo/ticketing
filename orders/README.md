# Orders Service

Is responsible for managing orders that are generated when a user purchases a ticket. Orders have different statuses such as Created, Awaiting Payment, Cancelled, and Completed. The service maintains a database model of orders that reference the ticket that generated the order.

## Events

#### TICKET-CREATED

This service listens for **TICKET-CREATED** events and replicates the ticket in its own database.

#### TICKET-UPDATED

This service listens for **TICKET-UPDATED** events and replicates the updated ticket in its own database.

#### EXPIRATION-COMPLETE

This service listens for **EXPIRATION-COMPLETE** events, changes the status of the order to cancelled and emits a new event called **ORDER-CANCELLED** to notify other services that the order has been cancelled.

#### PAYMENT-CREATED

This service listens for **PAYMENT-CREATED** events and updates the order status to "Complete".

## Routes

#### `GET /api/orders`

Returns the orders of a specific user.

#### `GET /api/orders/:orderId`

Returns the details of a specific order.

#### `POST /api/orders`

Creates a new order for a specific user based on a ticket ID and emits a new event called **ORDER-CREATED** to notify other services that a new order has been created.

#### `PATCH /api/orders/:orderId`

Updates the status of a specific order to "Cancelled" and emits a new event called **ORDER-CANCELLED** to notify other services.
