# Dockerfile
# $ npm install
# $ docker build -f dev.Dockerfile -t my-app-frontend .
# $ docker run -p 3001:3001 -v "$(pwd):/usr/src/app/" my-app-frontend
# $ docker exec -it <CONTAINER ID> bash
# http://app:3001/

FROM node:16

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./package.json .

COPY ./package-lock.json .

COPY . .

RUN npm config set package-lock false

RUN npm install -g npm

RUN npm install

RUN npm install -g react-scripts

COPY . ./

RUN ls -l /usr/src/app

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start", "--port", "3000"]