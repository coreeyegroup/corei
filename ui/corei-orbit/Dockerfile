# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY status-server.js ./
COPY server-package.json ./package.json
RUN npm install --production
EXPOSE 3000
CMD ["node", "status-server.js"]
