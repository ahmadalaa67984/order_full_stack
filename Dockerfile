# Use Node.js v14
FROM node:14

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install --production  # Install only production dependencies

# Bundle app source
COPY . .

# Expose the port
EXPOSE 8800

# Start the application
CMD [ "node", "index.js" ]
