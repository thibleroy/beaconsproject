FROM ubuntu

COPY entrypoint.sh /app/entrypoint.sh

USER root
WORKDIR /app

RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_11.x  | bash -
RUN apt-get -y install nodejs git

ENTRYPOINT ["/bin/bash", "/app/entrypoint.sh"]
