const mysql = require('mysql');

//Conecting to the database
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'test123',
    database: 'birlisanbirinsan',
    multipleStatements: true
  });
   mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
  });
  module.exports = mysqlConnection;