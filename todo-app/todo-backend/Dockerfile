# Dockerfile
# $ sudo docker build -t todo .
# $ sudo docker run -p 3000:3000 todo-backend
# http://localhost:3000/

FROM node:16

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app/

COPY . .

RUN npm install

CMD npm start --port 3000