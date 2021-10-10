# $ sudo docker build -t todo .
# $ sudo docker run -p 3000:3000 todo
# http://localhost:3000/

FROM node:16

WORKDIR /usr/src/todo

COPY . .

RUN npm install

CMD npm start