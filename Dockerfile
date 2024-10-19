# Use Node.js v16 or higher
FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose the port
EXPOSE 8800

CMD [ "node", "index.js" ]
