# Dockerfile
# $ docker build -t my-app-backend .
# $ docker run -p 3000:3000 my-app-backend

FROM node:16

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app/

COPY ./package.json .

COPY ./package-lock.json .

COPY . .

RUN npm install -g npm

ENV NODE_ENV=production

RUN npm install

RUN ls -l /usr/src/app/

ENV PORT=3001

CMD ["npm", "start", "--port", "3001"]