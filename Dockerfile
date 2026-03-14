# Use official Node image
FROM node:20-alpine
# Set working directory
WORKDIR /app
# Copy package files
COPY package.json package-lock.json ./
# Install dependencies
RUN npm ci

# Copy project files
COPY . .

COPY .env .env

# Build Next.js project
RUN npm run build

# Expose Next.js port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
