# Dockerfile
# $ docker build -f Dockerfile -t my-app-frontend
# $ docker run -p 3001:3001 my-app-frontend
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

RUN npm install -g react-scripts

RUN npm install

RUN npm run build

COPY . ./

RUN ls -l /usr/src/app/

CMD ["npm", "start", "--port", "3001"]