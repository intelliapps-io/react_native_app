import { createConnection, Connection } from "typeorm"

// connect to local database from docker
export const connectDB = async (): Promise<Connection> => new Promise((resolve, reject) => {
  createConnection()
    .then(connection => resolve(connection))
    .catch(err => reject(err))
  // createConnection({
  //   type: 'mysql',
  //   host: '127.0.0.1',
  //   port: 3306,
  //   username: 'user',
  //   password: 'password',
  //   database: 'db'
  // })
  //   .then(connection => resolve(connection))
  //   .catch(err => reject(err))
})