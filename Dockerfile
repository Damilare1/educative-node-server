FROM node:16-alpine3.17
# Install python/pip
RUN apk add --no-cache python3 make g++ libpq-dev
# set working directory
WORKDIR /app

# install app dependencies
COPY package.json /app/package.json
RUN npm install -g knex
RUN npm install


# make migration script executable in the container environment
COPY runMigrationAndSeed.sh /app/runMigrationAndSeed.sh
RUN chmod +x ./runMigrationAndSeed.sh

CMD ["npm", "run", "start"]