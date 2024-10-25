const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const RootQuery = require('./Resolvers/Query');
const Mutation = require('./Resolvers/Mutation');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: RootQuery
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: Mutation
  })
});
