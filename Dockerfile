# Use Node.js as base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .

# Expose API port
EXPOSE 5000

# Start the server
CMD ["node", "src/server.js"]