FROM node
RUN mkdir -p /var/www/dist
COPY package.json /var/www
WORKDIR /var/www
RUN npm install
WORKDIR /var/www
COPY . /var/www
RUN npm run build
VOLUME /var/www/dist
