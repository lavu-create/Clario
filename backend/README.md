# Clario Backend API

This is the backend API for the Clario application, a productivity and mood tracking tool. The API is built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- Task management
- Calendar events
- Mood tracking
- User profile management
- Data visualization endpoints

## API Documentation

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/auth/register | Register a new user |
| POST   | /api/auth/login | Login user |
| GET    | /api/auth/me | Get current user |
| PUT    | /api/auth/updatedetails | Update user details |
| PUT    | /api/auth/updatepassword | Update password |
| GET    | /api/auth/logout | Logout user |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/tasks | Get all tasks |
| POST   | /api/tasks | Create a new task |
| GET    | /api/tasks/:id | Get a single task |
| PUT    | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |
| GET    | /api/tasks/stats | Get task statistics |

### Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/events | Get all events |
| POST   | /api/events | Create a new event |
| GET    | /api/events/:id | Get a single event |
| PUT    | /api/events/:id | Update an event |
| DELETE | /api/events/:id | Delete an event |
| GET    | /api/events/range | Get events by date range |

### Moods

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/moods | Get all mood entries |
| POST   | /api/moods | Create a new mood entry |
| GET    | /api/moods/:id | Get a single mood entry |
| PUT    | /api/moods/:id | Update a mood entry |
| DELETE | /api/moods/:id | Delete a mood entry |
| GET    | /api/moods/stats | Get mood statistics |
| GET    | /api/moods/date/:date | Get mood entries by date |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/users | Get all users (Admin only) |
| POST   | /api/users | Create a new user (Admin only) |
| GET    | /api/users/:id | Get a single user |
| PUT    | /api/users/:id | Update a user |
| DELETE | /api/users/:id | Delete a user |
| PUT    | /api/users/:id/photo | Upload user photo |
| GET    | /api/users/dashboard/stats | Get user dashboard statistics |

## Environment Variables

Create a `.env` file in the root directory and add the following:

```
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/clario

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

# File Upload
MAX_FILE_UPLOAD=1000000
FILE_UPLOAD_PATH=./public/uploads

# CORS
FRONTEND_URL=http://localhost:3000
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. For production:
   ```
   npm start
   ```

## Database Setup

1. Make sure you have MongoDB installed and running locally or have a MongoDB Atlas connection string
2. Update the `MONGODB_URI` in the `.env` file with your MongoDB connection string

## API Usage

### Authentication

1. Register a new user:
   ```http
   POST /api/auth/register
   Content-Type: application/json

   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "123456"
   }
   ```

2. Login to get JWT token:
   ```http
   POST /api/auth/login
   Content-Type: application/json

   {
     "email": "john@example.com",
     "password": "123456"
   }
   ```

3. Use the token for authenticated requests:
   ```http
   GET /api/tasks
   Authorization: Bearer <your_jwt_token>
   ```

## Testing

To run tests:

```
npm test
```

## Deployment

1. Set up environment variables on your hosting provider
2. Install dependencies:
   ```
   npm install --production
   ```
3. Start the server:
   ```
   npm start
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [dotenv](https://www.npmjs.com/package/dotenv)
