require('dotenv').config();

const development = {
  "name": "default",
  "type": "mysql",
  "host": "127.0.0.1",
  "port": 3306,
  "username": "user",
  "password": "password",
  "database": "db",
  "synchronize": true,
  "logging": true,
  "entities": [
    "src/entities/*.*"
  ]
};

module.exports = development;