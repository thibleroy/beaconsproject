FROM ubuntu

COPY . /app

USER root
WORKDIR /app

RUN npm install
RUN npm run build

