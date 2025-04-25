ARG NODE_VERSION=22
ARG PORT=3001

# Base image
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /app

# Stage 1: Build
FROM base AS build

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run
FROM base

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /app/dist ./dist

USER node

ARG PORT=3001
EXPOSE ${PORT}

CMD ["npm", "start"]
