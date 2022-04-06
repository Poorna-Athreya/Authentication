#!/bin/sh
sleep 25
npx sequelize-cli db:migrate
npm start