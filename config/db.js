const { Sequelize } = require("sequelize");

// Create a connection to the database
const sequelize = new Sequelize("graphql_example", "root", "Vinod@!&321", {
  host: "localhost",
  dialect: "mysql",
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to MySQL has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;

// Sync Sequelize models to the database
sequelize.sync().then(() => {
  console.log('Database synced successfully!');
}).catch((err) => {
  console.log('Error syncing database: ', err);
});
