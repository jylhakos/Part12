# $ sudo docker build -t fs-hello-world .
# $ sudo docker run fs-hello-world
# $ sudo docker build -t express-server .
# $ sudo docker run -p 3123:3000 express-server
# http://localhost:3123/
# $ sudo docker container ls -a
# $ sudo docker kill b8871d0c769a && sudo docker container rm b8871d0c769a
# $ sudo docker build -t express-server . && sudo docker run -p 3000:3000 express-server

FROM node:16

USER node

WORKDIR /usr/src/app

# COPY . .

COPY --chown=node:node . .

RUN npm install

# RUN npm ci --only-production

ENV DEBUG=playground:*

# CMD DEBUG=playground:* npm start

CMD npm start
