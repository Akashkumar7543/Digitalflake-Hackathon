<!DOCTYPE html>
<html>
<head>
  <title>Digitalflake Hackathon Backend</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f4f4;
      padding: 20px;
    }

    .container {
      background: #ffffff;
      padding: 25px;
      max-width: 800px;
      margin: auto;
      border-radius: 5px;
    }

    h1 {
      text-align: center;
      color: #333;
    }

    h2 {
      color: #444;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
    }

    pre {
      background: #eee;
      padding: 10px;
      overflow-x: auto;
    }

    ul {
      line-height: 1.6;
    }
  </style>
</head>

<body>
  <div class="container">

    <h1>Digitalflake Hackathon – Backend</h1>

    <p>
      This is the backend server for the Digitalflake Hackathon project.
    </p>

    <h2>Requirements</h2>
    <ul>
      <li>Node.js installed</li>
      <li>npm installed</li>
      <li>MongoDB (local or cloud)</li>
      <li>Cloudinary account</li>
    </ul>

    <pre>
node -v
npm -v
    </pre>

    <h2>Setup Steps</h2>

    <p><b>1. Go to backend folder</b></p>
    <pre>cd backend</pre>

    <p><b>2. Install dependencies</b></p>
    <pre>npm install</pre>

    <h2>Environment File</h2>
    <p>Create a <b>.env</b> file inside backend folder:</p>

    <pre>
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
    </pre>

    <h2>Run Server</h2>
    <pre>npm run dev</pre>
    <pre>npm start</pre>

    <h2>Server URL</h2>
    <pre>http://localhost:5000</pre>

    <h2>API Example</h2>
    <pre>POST /auth/login</pre>

    <h2>Notes</h2>
    <ul>
      <li>Backend uses Express</li>
      <li>Database is MongoDB</li>
      <li>Authentication uses JWT</li>
      <li>Images uploaded using Cloudinary</li>
    </ul>

    <h2>Author</h2>
    <p>Akash Kumar</p>

  </div>
</body>
</html>
