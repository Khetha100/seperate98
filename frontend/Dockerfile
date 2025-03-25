# Fetch Node.js image
FROM node:20.11.0-alpine

# Set the working directory inside the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json
COPY package*.json /app/frontend/

# Clean cache and install dependencies
RUN npm cache clean --force
RUN npm install --force --save

# Copy source code
COPY . .

# **Set environment variable for backend API URL**
ENV BACKEND_URL="https://seperate98-back5.onrender.com"

# Replace backend URL in Angular build
RUN sed -i "s|http://localhost:8080|${BACKEND_URL}|g" src/environments/environment.prod.ts

# Build Angular app
RUN npm run build -- --configuration=production

# Use Nginx to serve Angular app
FROM nginx:alpine

# Copy built frontend app to Nginx folder
COPY --from=0 /app/dist/* /usr/share/nginx/html

# Expose port 80 for serving frontend
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
