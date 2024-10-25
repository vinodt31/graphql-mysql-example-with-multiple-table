const { GraphQLList, GraphQLID } = require('graphql');
const UserType = require('../TypeDefs/UserType');
const PostType = require('../TypeDefs/PostType');
const CommentType = require('../TypeDefs/CommentType');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');

const RootQuery = {
  users: {
    type: new GraphQLList(UserType),
    resolve() {
      return User.findAll(); // Sequelize fetches all users
    }
  },
  user: {
    type: UserType,
    args: { id: { type: GraphQLID } },
    async resolve(parent, args) {
      return await User.findByPk(args.id); // Fetch user by ID
    },
  },
  posts: {
    type: new GraphQLList(PostType),
    resolve() {
      return Post.findAll();
    }
  },
  post: {
    type: PostType,
    args: {id: {type: GraphQLID}},
    async resolve(parent, args){
      return await Post.findByPk(args.id);
    }
  },
  comments: {
    type: new GraphQLList(CommentType),
    resolve() {
      return Comment.findAll();
    }
  },
  comment: {
    type: CommentType,
    args: {id: {type: GraphQLID}},
    async resolve(parent, args){
      return await Comment.findByPk(args.id);
    }
  }
};

module.exports = RootQuery;
