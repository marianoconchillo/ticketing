# Auth Service

Handles user authentication. The service uses jsonwebtokens and cookies for authentication purposes. It provides routes for retrieving the current user, sign in, sign out, and sign up.

## Routes

#### `GET /api/auth/currentUser`

Returns the current user if the user is authenticated.

#### `POST /api/auth/signIn`

Authenticates the user with the provided credentials (email and password) and returns a token.

#### `POST /api/auth/signOut`

Invalidates the token of the currently authenticated user and signs them out.

#### `POST /api/auth/signUp`

Creates a new user with the provided credentials (email and password) and returns a token.
