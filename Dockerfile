FROM ubuntu:latest

RUN apt update && apt install -y curl nodejs npm git

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json /app/package.json
RUN npm cache clean -f
RUN npm install -g n
RUN n stable
RUN npm install -g knex
RUN npm install


# make migration script executable in the container environment
COPY runMigrationAndSeed.sh /app/runMigrationAndSeed.sh
RUN chmod +x ./runMigrationAndSeed.sh

CMD ["npm", "run", "start"]