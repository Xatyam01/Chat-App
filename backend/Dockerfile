# Use official Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the backend code
COPY . .

# Expose port
EXPOSE 5000

# Start the server
CMD ["node", "index.js"]
