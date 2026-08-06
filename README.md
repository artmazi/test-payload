# Payload CMS + Next.js Vercel Project

This project is a functional website and CMS using Payload CMS v3.0, Next.js with TypeScript, and MongoDB Atlas, configured for deployment on Vercel.

## Setup Instructions

### 1. Local Development
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Update the variables in `.env` with your actual credentials.
4. Start the development server:
   ```bash
   npm run dev
   ```

### 2. Creating and Connecting MongoDB Atlas
1. Sign up or log into [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a new cluster (the free tier works perfectly).
3. Under "Database Access", create a new database user.
4. Under "Network Access", allow your IP address or `0.0.0.0/0` (for Vercel deployment).
5. Click "Connect", choose "Connect your application", and copy the connection string.
6. Paste the connection string into `MONGODB_URI` in your `.env` file, replacing `<username>` and `<password>`.

### 3. Configuring Image Storage (Vercel Blob)
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and navigate to the Storage tab.
2. Create a new Vercel Blob store.
3. Link the Blob store to your Vercel project (you might need to deploy the project first to link it, or link it to a new project).
4. In the Blob settings, reveal the `BLOB_READ_WRITE_TOKEN`.
5. Add this token to your local `.env` and Vercel environment variables.

### 4. Creating the First Admin User
Once your database is connected and local server is running, you can create the first admin user:
1. Make sure the server is running (`npm run dev`).
2. Open another terminal and run the Payload CLI:
   ```bash
   npx payload add-user
   ```
3. Follow the prompts to enter an email and password.
4. Log into the CMS at `http://localhost:3000/admin`.

### 5. Deploying to Vercel
1. Push your code to a GitHub repository.
2. Go to Vercel and import your repository.
3. In the "Environment Variables" section during setup, add:
   - `MONGODB_URI`
   - `PAYLOAD_SECRET` (generate a random string, e.g., using `openssl rand -base64 32`)
4. Link your Vercel Blob storage to the project (this automatically provides `BLOB_READ_WRITE_TOKEN` in production).
5. Click "Deploy". Your images will persist in Vercel Blob across deployments.
