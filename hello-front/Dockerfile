# Dockerfile
# $ npx create-react-app hello-front --use-npm
# $ npm run build
# $ docker build . -t hello-front
# $ docker run -it hello-front bash
# $ docker build . -t hello-front
# $ docker run -p 5000:5000 hello-front
# http://localhost:5000/
# $ docker run -p 8000:80 hello-front
# http://localhost:8000/

FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

# RUN npm install -g serve

# CMD ["serve", "build"]

FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
