# Deployment

Deploy the frontend and API as separate services. This project folder contains the `frontend` and `backend` directories.

## 1. Deploy the API on Render

Create a **Web Service** from the Git repository and set:

- Root Directory: `backend`
- Build Command: `pip install -r requirements.txt`
- Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

Add these environment variables in the Render service settings:

- `GROQ_API_KEY`: your Groq API key
- `ALLOWED_ORIGINS`: your Vercel site origin, for example `https://your-site.vercel.app` (no trailing slash)

After deployment, confirm the API responds at `https://your-api.onrender.com/docs`.

## 2. Deploy the frontend on Vercel

Import the same Git repository as a Vercel project and set:

- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`

Add this environment variable:

- `VITE_API_URL`: the Render service origin, for example `https://your-api.onrender.com` (no trailing slash)

Redeploy after adding or changing environment variables. The Vite frontend reads this value at build time.

## Local development

Copy `frontend/.env.example` to `frontend/.env.local`, then run the frontend with `npm run dev` from `frontend`. Run the API from `backend` with `uvicorn main:app --reload --port 8000` after installing `backend/requirements.txt` and setting `GROQ_API_KEY` in your shell.
