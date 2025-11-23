FROM node:latest AS build
WORKDIR /app
COPY package*.json ./
RUN apt-get update && apt-get install -y dos2unix
RUN find . -type f -print0 | xargs -0 dos2unix
RUN npm ci
COPY . .
RUN npm run build --configuration production