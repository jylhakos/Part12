# Containers

A container runs the software using the host operating system.

A container is a sandboxed process on your machine that is isolated from all other processes on the host machine.


**Containers and images**

A container is a runtime instance of an image.

The image contains the container’s filesystem and contains everything needed to run an application.

You can use existing images to create a new image by adding new layers on top of the existing ones.

**Docker**

Docker is a set of products that help us to manage images and containers.

The command that tell Docker to create a container from an image. 

```
$ docker container run hello-world

```

**Orchestration**

Tools to manage, scale, and maintain containerized applications are called orchestrators, and the most common is Kubernetes.

For managing the Docker containers, there is a tool called Docker Compose that allows one to orchestrate multiple containers at the same time. 


**Building and configuring**

Build image, run an image as a container and share images using Docker repository.

**Dockerfile**

Instead of modifying a container by copying files inside, we can create a new image that contains the "Hello World" application.

Dockerfile uses syntax like the following script.

```
FROM node:16

WORKDIR /usr/src/app

COPY ./index.js ./index.js

CMD node index.js

```

FROM instruction will tell Docker that the base for the image should be node application. 

COPY instruction will copy the file index.js from the host machine to the file with the same name in the image. 

CMD instruction tells what happens when docker run is used. 

Let's build the image from the Dockerfile with the following command.

```
$ docker build .

```

**Docker Compose**

With Docker Compose, we can create a YAML file to define the services.

At the root of the app project, create docker-compose.yml file.

Start up the application stack using the docker-compose up command.

```
$ docker-compose up -d

```

You can run the application detached in the background with -d flag.

An example docker-compose.yml looks like the following script.

```
version: '3.9'           

services:
  app:                    
    image: express-server 
    build: . 
    ports:  
    publish
      - 3000:3000
```

**Persisting data with volumes**

There are two distinct methods to store the data:

1. Declaring a location in your filesystem (called bind mount)

2. Letting Docker decide where to store the data (volumes)

The file mongo-init.js on the host machine is mounted into container's /docker-entrypoint-initdb.d directory.

The following docker-compose configuration using volumes creates a directory called mongo_data to your local filesystem and maps it into the container as /data/db directory.

Using volumes means that the data in /data/db is stored outside of the container but still accessible by the container.

```
services:
  mongo:
    image: mongo
    ports:
     - 3456:27017
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
      MONGO_INITDB_DATABASE: database
    volumes:
      - ./mongo/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js
      - ./mongo_data:/data/db

```

**React in a container**

Use create-react-app command to create a project for the web app.

```
$ npx create-react-app app --use-npm

```

The next step is to build the JavaScript code and CSS files, into production static files. 

```
$ npm run build

```

The final step is configure Dockerfile to use a Node server to publish the static files. 

```

FROM node

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

```

**Development in containers**

We move the application development into a container.

Start the application in development mode with the following Dockerfile content.

```
FROM node

WORKDIR /usr/src/app

COPY . .

# Change npm ci to npm install for development mode
RUN npm install

# Start the application in development mode by npm start command
CMD ["npm", "start"]

```

During build the flag -f will be used to tell which Dockerfile file to use for development mode.

```
$ docker build -f ./app/Dockerfile -t app-dev .

```

For accessing the files use volumes to preserve data with the database.

```
$ docker run -p 3000:3000 -v "$(pwd):/usr/src/app/" app-dev

```

You can use Docker Compose to define your local development environment, including environment variables, ports to access, and volumes to mount. 

The docker-compose.yml file for the application development in the container looks like the following syntax.

```
services:
  app:
    image: app-dev
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - ./:/usr/src/app
    ports:
      - 3000:3000
    container_name: app-dev 

```

**Communication between containers in a docker network**

To make a port available to services outside of Docker, or to Docker containers which are not connected to the container’s network, use the -p flag to create a firewall rule which maps a container port to a port on the Docker host. 

The Docker Compose tool sets up a network between the containers and includes a DNS to connect the containers. 

The reverse proxy is the single point of entry to our application, and the goal is to set both the React frontend and the Node backend behind the reverse proxy.

Create nginx.conf file in the project root and copy the following template as a starting point for the reverse proxy. 

```
events { }

http {
  server {
    listen 80;

    location / {
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_pass http://localhost:3000;
    }
  }
}

```

Add Nginx reverse-proxy to the docker-compose.yml file in the following script. 

```
nginx:
    image: nginx
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    ports:
      - 8080:80
    container_name: reverse-proxy

```

Browse Docker manuals at the following link.

https://docs.docker.com/


![alt text](https://github.com/jylhakos/Part12/docker.svg?raw=true)

