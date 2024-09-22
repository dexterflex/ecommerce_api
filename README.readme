# E-Commerce API

## Overview
The E-Commerce API is a RESTful web service designed to support a full-featured e-commerce platform. This API enables developers to integrate functionalities such as user authentication, product management, shopping cart operations, and order processing, providing a seamless experience for end-users.

## Features
### User Authentication
- **Register**: Users can create a new account by providing their name, email, and password.
- **Login**: Existing users can authenticate using their email and password to receive a JWT token for secure access.
- **Logout**: Users can log out, which clears the session token.

### Product Management
- **Create Products**: Admin users can add new products to the inventory, including details like name, description, price, and image.
- **Read Products**: Users can retrieve a list of all available products or fetch details of a specific product by ID.
- **Update Products**: Admin users can modify existing product details.
- **Delete Products**: Admin users can remove products from the inventory.

### Shopping Cart Functionality
- **View Cart**: Users can view their current cart, including all added items.
- **Add to Cart**: Users can add products to their cart for future purchase.
- **Update Cart**: Users can modify item quantities or replace products in the cart.
- **Remove from Cart**: Users can delete items from their cart.

### Order Processing
- **Create Orders**: Users can place orders for items in their cart, which will generate an order record.
- **View Orders**: Users can access their order history, including details like order status and purchased items.
- **Admin Order Management**: Admin users can view all orders and manage order statuses.

## Technologies Used
- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Web application framework for building APIs.
- **MongoDB**: NoSQL database for storing user and product data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (JSON Web Token)**: For secure user authentication and session management.

## Environment Variables
To run this project, you will need to set the following environment variables:

- **PORT**: The port on which the server will listen (default: `5000`).
- **DB_URL**: MongoDB connection string for the database.
- **JWT_SECRET**: Secret key used for signing JWT tokens to secure user sessions.

### Example
Create a `.env` file in the root directory of your project and add the following environment variables:

```plaintext
PORT=5000
DB_URL=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret
