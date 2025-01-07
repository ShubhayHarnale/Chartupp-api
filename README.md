# ChartUpp API

Backend API for ChartUpp, a freelance services marketplace platform.

## Features

- User Authentication (JWT)
- Gig Management
- Order Processing
- Payment Integration (Stripe)
- Messaging System
- Review System

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Stripe Payment

## Setup

1. Clone the repository
```bash
git clone [repository-url]
cd chartupp-api
```

2. Install dependencies
```bash
npm install
```

3. Create a .env file in the root directory with the following variables:
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
PORT=8800
```

4. Start the server
```bash
npm start
```

## API Endpoints

### Auth
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- POST /api/auth/logout - Logout user

### Users
- GET /api/users/me - Get current user
- GET /api/users/:id - Get user by ID
- PUT /api/users/:id - Update user
- DELETE /api/users/:id - Delete user

### Gigs
- POST /api/gigs - Create new gig
- GET /api/gigs - Get all gigs
- GET /api/gigs/:id - Get single gig
- PUT /api/gigs/:id - Update gig
- DELETE /api/gigs/:id - Delete gig

### Orders
- POST /api/orders/create-payment-intent/:id - Create payment intent
- GET /api/orders - Get orders
- PUT /api/orders - Confirm order 