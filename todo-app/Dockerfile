# Use an official Node.js runtime as a parent image
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json from the todo-app folder
COPY todo-app/package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code from the todo-app folder
COPY todo-app/ .

# Build the app
RUN npm run build

# Use Nginx to serve the React app
FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

