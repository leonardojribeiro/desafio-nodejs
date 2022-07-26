FROM node:16

WORKDIR /usr/application

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD npm run start