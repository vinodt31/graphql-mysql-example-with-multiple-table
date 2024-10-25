const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: GraphQLID },
    comment_text: { type: GraphQLString },
    userId: { type: GraphQLID },
    postId: { type: GraphQLID }
  })
});

module.exports = CommentType;
