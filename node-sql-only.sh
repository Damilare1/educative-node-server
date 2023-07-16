#!/bin/bash
# starting database (mysql)
service mysql start

mysql < /queries.sql

# starting node server
echo "Installing modules"
npm install pm2@latest -g >& /dev/null
cd /node-server && npm install >& /dev/null
echo "Modules installed"

pm2 start ./index.js --name SurveyApi >& /dev/null

# Waiting for the server to start
printf "\nServer starting...\n"

curl http://localhost:8000/ &> log.txt

while :
do
   if grep "Your app refused to connect" < log.txt > waste.txt; then
	   i=1
      curl  http://localhost:8000/ &> log.txt
   else
	break
   fi

done
echo "Running Migrations and adding Seeds"
./runMigrationAndSeed.sh >& /dev/null
echo "Done"
echo "Server Started"