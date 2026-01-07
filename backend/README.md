<div style="font-family: Arial, sans-serif; background:#0f172a; color:#e5e7eb; padding:30px; border-radius:12px;">

  <h1 style="color:#38bdf8; text-align:center;">
    Digitalflake Hackathon – Backend
  </h1>

  <p style="text-align:center; font-size:16px;">
    Backend server for the <b>Digitalflake Hackathon Project</b> built with 
    <span style="color:#22c55e;">Node.js</span>, 
    <span style="color:#facc15;">MongoDB</span> and 
    <span style="color:#ec4899;">Cloudinary</span>.
  </p>

  <hr style="border:1px solid #334155; margin:20px 0;" />

  <h2 style="color:#f472b6;">📋 Requirements</h2>
  <ul>
    <li>✅ Node.js</li>
    <li>✅ npm</li>
    <li>✅ MongoDB</li>
    <li>✅ Cloudinary Account</li>
  </ul>

  <pre style="background:#020617; padding:15px; border-radius:8px; color:#38bdf8;">
node -v
npm -v
  </pre>

  <h2 style="color:#f472b6;">Setup</h2>

  <h3 style="color:#22c55e;">1. Go to backend folder</h3>
  <pre style="background:#020617; padding:15px; border-radius:8px;">
cd backend
  </pre>

  <h3 style="color:#22c55e;">2. Install dependencies</h3>
  <pre style="background:#020617; padding:15px; border-radius:8px;">
npm install
  </pre>

  <h2 style="color:#f472b6;">🔐 Environment Variables</h2>
  <p>Create a <b>.env</b> file inside backend folder:</p>

  <pre style="background:#020617; padding:15px; border-radius:8px; color:#a5f3fc;">
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
  </pre>

  <h2 style="color:#f472b6;">☁️ Cloudinary Setup</h2>
  <ol>
    <li>Visit https://cloudinary.com</li>
    <li>Create an account</li>
    <li>Open Dashboard</li>
    <li>Copy Cloud Name, API Key, API Secret</li>
    <li>Paste them into <b>.env</b></li>
  </ol>

  <p style="color:#93c5fd;">
    Cloudinary stores images for categories, subcategories and products.
  </p>

  <h2 style="color:#f472b6;">▶️ Run Server</h2>

  <b>Development Mode</b>
  <pre style="background:#020617; padding:15px; border-radius:8px;">
npm run dev
  </pre>

  <b>Production Mode</b>
  <pre style="background:#020617; padding:15px; border-radius:8px;">
npm start
  </pre>

  <h2 style="color:#f472b6;">🌐 Server URL</h2>
  <pre style="background:#020617; padding:15px; border-radius:8px;">
http://localhost:5000
  </pre>

  <h2 style="color:#f472b6;">🔌 API Example</h2>
  <pre style="background:#020617; padding:15px; border-radius:8px;">
POST /auth/login
  </pre>

  <h2 style="color:#f472b6;">📝 Tech Stack</h2>
  <ul>
    <li>⚡ Express.js</li>
    <li>🗄️ MongoDB</li>
    <li>🔑 JWT Authentication</li>
    <li>🖼️ Cloudinary Image Storage</li>
  </ul>

  <hr style="border:1px solid #334155; margin:20px 0;" />

  <h3 style="text-align:center; color:#38bdf8;">
    👨‍💻 Author – Akash Kumar
  </h3>

</div>
