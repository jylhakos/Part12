# Dockerfile
# $ nmcli dev show | grep 'IP4.DNS'
# $ docker build . -t todo-frontend
# $ docker run -p 3001:3001 todo-frontend
# http://localhost:3001/

FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm config set package-lock false

RUN npm install -g npm@latest

# RUN npm install

RUN npm ci

RUN npm run build

RUN CI=true npm test

ENV REACT_APP_BACKEND_URL=http://localhost:3000/

ENV PORT=3001

EXPOSE 3001

CMD ["npm", "start"]