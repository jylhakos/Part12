# Dockerfile
# $ npm install
# $ nmcli dev show | grep 'IP4.DNS'
# $ docker build . -t todo-frontend
# $ docker run -p 3001:3001 todo-frontend
# http://localhost:3001/

FROM node:16

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./package.json .

COPY ./package-lock.json .

COPY . .

RUN npm config set package-lock false

RUN npm install -g npm

ENV NODE_ENV=production

RUN npm install

RUN npm install -g react-scripts

RUN npm run build

COPY . ./

RUN ls -l /usr/src/app/

# RUN ls -l /usr/src/app/node_modules/

# RUN cat /usr/src/app/package.json

COPY ./build /bin/www

# ENV REACT_APP_BACKEND_URL=http://localhost:3000/

ENV PORT=3001

EXPOSE 3001

CMD ["npm", "start", "--port", "3001"]