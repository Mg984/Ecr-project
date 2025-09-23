# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app

# Copy dependencies files first (for caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend source
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

RUN cat > /etc/nginx/conf.d/default.conf <<'EOF'
server {
  listen 80;
  location / {
    root /usr/share/nginx/html;
    try_files $uri /index.html;
  }
  location /api/ {
    proxy_pass http://backend-service:5000/;
  }
}
EOF

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
