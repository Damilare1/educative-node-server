# FROM ubuntu:latest

# RUN apt update && apt install -y nodejs npm git

# # set working directory
# WORKDIR /app
FROM ubuntu:20.04
RUN  apt -y update && apt -y upgrade &&  apt install git unzip zip wget vim -y
RUN apt-get update &&\
apt-get install &&\
DEBIAN_FRONTEND="noninteractive" apt-get -y install tzdata &&\
apt-get install curl software-properties-common -y &&\
curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh &&\
bash nodesource_setup.sh &&\
apt-get install nodejs -y && npm install -g @vue/cli \
&& npm install -g nuxi@3.2.2 && npm i -g vercel@latest \
&& curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
&& unzip awscliv2.zip && ./aws/install
RUN apt-get install mysql-server -y
RUN npm install -g knex

COPY / /

RUN chmod +x "/node-sql-only.sh"