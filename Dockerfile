# Use Node.js v14
FROM node:14

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# Optional: Install build tools if needed
RUN apt-get update && apt-get install -y build-essential

RUN npm install

# Bundle app source
COPY . .

# Optional: Clean npm cache
RUN npm cache clean --force

# Expose the port
EXPOSE 8800

# Use ENTRYPOINT for better signal handling
ENTRYPOINT ["node", "index.js"]
