# Dockerfile
# $ export DOCKER_API_VERSION=1.39
# $ docker build -f dev.Dockerfile -t my-app-backend .
# $ docker run -p 3000:3000 my-app-backend
# http://localhost:3000/

FROM node:16

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app/

COPY ./package.json .

COPY ./package-lock.json .

COPY . .

# RUN apt-get update

RUN npm install -g npm@latest

RUN npm install -g nodemon

RUN npm install

CMD npm run dev --port 3000
