NGINX Proxy with Docker for GREEN-API

Overview
This setup uses NGINX as a reverse proxy to route requests to GREEN-API while serving static files. The configuration is containerized using Docker, making it easy to deploy and manage.

Key Features
Reverse Proxy: Proxies requests to https://7105.api.green-api.com with proper headers.
Static File Hosting: Serves static files (index.html, CSS, JS, etc.).
CORS Configuration: Allows cross-origin requests for API communication.
Dockerized Deployment: Simplifies running NGINX through Docker.
Prerequisites
Docker and Docker Compose installed on your machine.
File Structure


project/
├── index.html           # Your main HTML file
├── styles.css           # CSS for styling
├── script.js            # JavaScript for API interaction
├── nginx.conf           # NGINX configuration
├── Dockerfile           # Dockerfile to build custom NGINX
├── docker-compose.yml   # Docker Compose for container orchestration


NGINX Configuration (nginx.conf)
Here’s the main NGINX configuration used for this setup:


server {
    listen 80;
    server_name 172.30.154.231; # Replace with your domain or IP

    location /waInstance7105204156/ {
        proxy_pass https://7105.api.green-api.com; # Proxy requests to GREEN-API
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        # CORS settings
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
        add_header Access-Control-Allow-Headers 'Origin, Content-Type, Accept, Authorization';
        if ($request_method = OPTIONS) { return 204; }
    }

    location / {
        root /usr/share/nginx/html;
        index index.html;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}


Docker Deployment
1. Create a Dockerfile:

FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html
EXPOSE 80


2. Create a docker-compose.yml:

version: "3.8"
services:
  nginx:
    build: .
    container_name: nginx-proxy
    ports:
      - "8080:80"
    restart: always
3. Start the Containers


Run the following commands to build and start the container:

docker-compose build
docker-compose up -d


Access the Application

Open http://localhost:8080 (or replace localhost with your server's IP) in your browser to access the service.


Notes

Update the server_name value in nginx.conf with your public domain name or IP.
Use your personal url from account.
For HTTPS support, add an SSL certificate using tools like Certbot.
