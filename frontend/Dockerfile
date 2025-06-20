# Step 1: Build React app
FROM node:18 AS build

WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the frontend code and build it
COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:stable-alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built React app to Nginx's web root
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
