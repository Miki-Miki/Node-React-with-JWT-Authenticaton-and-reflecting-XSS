// database configuration
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "xxx", /*change to your mysql root password*/
    DB: "testdb",
    PORT: "3306",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };