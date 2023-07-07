# Use an official Node.js runtime as a parent image
FROM node:18 as builder

# Set the working directory to /app
WORKDIR /react-ui

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to /app
COPY . .

EXPOSE 3000

# Build the React app
RUN npm run build:prod


# Use Nginx as the server
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

# Copy the built React app from the previous stage
COPY --from=builder /react-ui/build .

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
