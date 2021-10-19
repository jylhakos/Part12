# Dockerfile
# $ npm install
# $ docker build -t todo-backend .
# $ docker run -p 3000:3000 todo-backend
# http://localhost:3000/

FROM node:16

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app/

COPY ./package.json .

COPY ./package-lock.json .

COPY . .

RUN npm install -g npm

# RUN npm install -g nodemon

ENV NODE_ENV=production

RUN npm install

# RUN npm install -g express

# COPY . ./

# ENV PORT=3000

# EXPOSE 3000

RUN ls -l /usr/src/app/

# RUN ls -l /usr/src/app/node_modules/

# RUN cat /usr/src/app/package.json

CMD ["npm", "start", "--port", "3000"]