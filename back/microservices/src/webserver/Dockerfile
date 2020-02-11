FROM node:latest
USER root
RUN git clone https://gitlab.istic.univ-rennes1.fr/activiot/beaconsproject.git /app && ls
WORKDIR /app/back
RUN npm run install:lib
RUN npm run install:microservices
RUN npm run install:webserver
WORKDIR /app/back/microservices/src/webserver
EXPOSE 3000/tcp
CMD npm run start
