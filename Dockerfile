FROM node:23-slim

WORKDIR /usr/local/app

COPY package*.json ./

RUN npm install

COPY . .

USER node

EXPOSE 3000

CMD ["npm", "run", "dev"]
