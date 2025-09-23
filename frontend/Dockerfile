# Stage 1: build
FROM node:18-alpine AS build
WORKDIR /app

# copy package files first for layer caching
COPY package*.json ./
RUN npm install

# copy source and build
COPY . .
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# nginx config: proxy /api to backend-service (K8s service name)
RUN cat > /etc/nginx/conf.d/default.conf <<'EOF'
server {
  listen 80;
  location / {
    root /usr/share/nginx/html;
    try_files $uri /index.html;
  }
  location /api/ {
    proxy_pass http://backend-service:5000/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
EOF

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
