# Pure Ledger Backend

This is the backend of the **Pure Ledger** application, a web-based income and expense tracking platform. The backend is built with **Node.js**, **Express.js**, and **MongoDB** (via **Mongoose**), and it handles user authentication, transaction data storage, and API endpoints.

## Features

- **User Authentication**: Secure JWT-based authentication for users.
- **Transactions**: CRUD operations for managing income and expense records.
- **Account Heads**: Users can create and manage account heads for their transactions.
- **Security**: Password hashing with **bcryptjs** and secure token generation with **jsonwebtoken**.

---

## Technology Stack

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for building the REST API.
- **MongoDB**: NoSQL database to store user data, transactions, and account heads.
- **Mongoose**: ODM for MongoDB to interact with the database.
- **JWT**: JSON Web Token for secure user authentication.
- **bcryptjs**: Password hashing for secure authentication.
- **dotenv**: For managing environment variables securely.
- **Zod**: For input validation.

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/pure-ledger-backend.git
cd pure-ledger-backend
