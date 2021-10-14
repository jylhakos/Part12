# Dockerfile
# $ docker build . -t todo-frontend
# $ docker run -p 3001:3001 todo-frontend
# http://localhost:3001/

FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

ENV REACT_APP_BACKEND_URL=http://localhost:3000/

CMD ["npm", "start"]