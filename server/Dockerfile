FROM node:latest
WORKDIR /usr/src/app

ENV PORT=8000
ENV DBHOST=mongo

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE $PORT
CMD [ "npm", "start" ]