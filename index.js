const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const sequelize = require("./config/db");

const app = express();

// Test DB connection
sequelize.authenticate().then(() => {
  console.log("Database connected...");
}).catch(err => {
  console.error("Error: " + err);
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Server running at http://localhost:4000/graphql");
});
