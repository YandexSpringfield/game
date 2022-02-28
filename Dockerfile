FROM node:16-alpine

WORKDIR /var/www

COPY package*.json ./

# Disable Husky https://typicode.github.io/husky/#/?id=disable-husky-in-cidocker
RUN npm set-script prepare ""

RUN npm install

COPY . .

EXPOSE 3000
CMD npm run serve
