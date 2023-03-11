FROM ubuntu:latest

RUN apt update && apt install -y nodejs npm git

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g knex

# make migration script executable in the container environment
COPY runMigrationAndSeed.sh /app/runMigrationAndSeed.sh
RUN chmod +x ./runMigrationAndSeed.sh

CMD ["npm", "run", "start"]