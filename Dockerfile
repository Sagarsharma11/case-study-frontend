# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the default port for Vite's development server
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev", "--", "--host"]

