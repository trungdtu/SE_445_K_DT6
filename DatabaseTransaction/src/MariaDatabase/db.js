const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'dbtransaction'
});

module.exports={
  getConnection: function(){
      return new Promise(function(resolve,reject){
          pool.getConnection().then(function(connection){
              resolve(connection);
          }).catch(function(error) {
              reject(error);
          });
      });
  }
}

module.exports = pool;