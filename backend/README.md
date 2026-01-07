Backend – Digitalflake Hackathon

This is the backend server for the Digitalflake Hackathon project.

Requirements

Make sure you have:

Node.js installed

npm installed

MongoDB (local or cloud)

Cloudinary account (for image upload)

Check:

node -v
npm -v

Folder Structure
backend/
├── config/
├── controller/
├── middleware/
├── model/
├── router/
├── .env
├── index.js
├── package.json
└── README.md

Setup Steps
1. Go to backend folder
cd backend

2. Install dependencies
npm install

Environment File

Create a .env file inside backend folder:

PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Cloudinary Setup

Go to https://cloudinary.com

Create an account

Open Dashboard

Copy:

Cloud Name

API Key

API Secret

Paste them into .env file

Cloudinary is used to store images (category, subcategory, product).

Run Backend Server
Development mode
npm run dev

OR normal start
npm start

Server Running At
http://localhost:5000

API Example

Login API:

POST /auth/login

Notes

Backend uses Express

Database is MongoDB

Authentication uses JWT

Images are uploaded using Cloudinary

Author

Akash Kumar
Digitalflake Hackathon
