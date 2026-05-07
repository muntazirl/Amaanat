# PassOp - Password Manager

A secure and user-friendly password manager built with React for the frontend and Node.js/Express with MongoDB for the backend.

## Features

- **Secure Storage**: Store your passwords safely in a MongoDB database.
- **Add/Edit/Delete**: Easily manage your password entries.
- **Password Visibility**: Toggle password visibility for convenience.
- **Responsive Design**: Built with Tailwind CSS for a modern, responsive UI.
- **Toast Notifications**: Get feedback on actions with React Toastify.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, React Toastify
- **Backend**: Node.js, Express, MongoDB
- **Other**: UUID for unique IDs

## Installation

### Prerequisites
- Node.js
- MongoDB (local or cloud instance)

### Backend Setup
1. Navigate to the `backend` directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the backend server:
   ```
   node server.js
   ```

### Frontend Setup
1. In the root directory, install dependencies:
   ```
   npm install
   ```
2. Start the development server:
   ```
   npm run dev
   ```

## Usage

1. Open your browser and go to `http://localhost:5173` (default Vite port).
2. Add your passwords by filling in the site, username, and password fields.
3. View, edit, or delete existing passwords.
4. Use the eye icon to toggle password visibility.

## Contributing

Feel free to fork and contribute to this project!

## License

This project is licensed under the ISC License.
