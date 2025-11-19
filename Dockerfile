# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all project files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --production

# Copy built application from builder stage
COPY --from=builder /app/.output ./.output

# Expose port 3000 (Nuxt default)
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the Nuxt server
CMD ["node", ".output/server/index.mjs"]
