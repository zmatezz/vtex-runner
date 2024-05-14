FROM node:14

WORKDIR /app

COPY package*.json .

COPY . .

RUN npm install

EXPOSE 5000

CMD [ "npm", "run", "dev" ]