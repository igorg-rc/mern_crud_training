const db = require('./mysql_db')

const mysql_start = () => {
  db
    .authenticate()
    .then(() => console.log('Connected to MySQL'))
    .catch(error => console.log(`Unable to connect to MySQL: ${error}`))  
}

module.exports = mysql_start

// const sql_start = async () => {
//   try {
//     await db.authenticate()
//     console.log('Connected to MySQL')
//   } catch (error) { 
//     console.log('Unable to connect to the database: ' + error)
//   }
// }