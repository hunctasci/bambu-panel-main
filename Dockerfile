# Stage 1: Base image with Node.js
FROM node:18-alpine AS base
WORKDIR /app

# Stage 2: Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Stage 3: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 4: Production server
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy over necessary files from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose the port Next.js uses
EXPOSE 3000

# Start the Next.js server in production mode
CMD ["npm", "start"]
