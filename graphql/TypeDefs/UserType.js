const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require('graphql');
const PostType = require('./PostType');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return parent.getPosts(); // Sequelize relation
      }
    }
  })
});

module.exports = UserType;
