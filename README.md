# nginx-node-mongo-docker-compose

## What I Implemented

* Configured MongoDB connection in Node.js using **environment variables via Docker Compose (.env)**.
* Enabled **inter-container communication** using Docker service names (e.g., `mongodb` as DB host).
* Built a **Node.js backend** that dynamically connects to MongoDB without hardcoded values.
* Added **retry logic** in backend to wait until MongoDB becomes available.
* Set up **Nginx reverse proxy** to route `/api` requests to backend service.
* Used proxy-based routing to achieve **same-origin setup**, removing the need for CORS.
