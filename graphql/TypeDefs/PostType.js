const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require('graphql');
const CommentType = require('./CommentType');

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    userId: { type: GraphQLID },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent, args) {
        return parent.getComments(); // Sequelize relation
      }
    }
  })
});

module.exports = PostType;
