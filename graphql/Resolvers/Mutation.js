const { GraphQLString, GraphQLID, GraphQLNonNull } = require('graphql');
const UserType = require('../TypeDefs/UserType');
const PostType = require("../TypeDefs/PostType");
const CommentType = require("../TypeDefs/CommentType");
const User = require('../../models/User');
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");

const Mutation = {
  createUser: {
    type: UserType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parent, args) {
      return await User.create({
        name: args.name,
        email: args.email
      });
    }
  },
  // Mutation to update user details
  updateUser: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }, // ID is required to update the user
      name: { type: GraphQLString },
      email: { type: GraphQLString }
    },
    async resolve(parent, args) {
      // Fetch the user by ID
      console.log(" user id : ".args.id);
      const user = await User.findByPk(args.id);
      if (!user) throw new Error('User not found');

      // Update user's data if provided
      if (args.name !== undefined) user.name = args.name;
      if (args.email !== undefined) user.email = args.email;

      // Save changes to the database
      await user.save();
      return user;
    },
  },
  // Mutation to delete user by user id
  deleteUser: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
      const user = await User.findByPk(args.id);
      if (!user) throw new Error('User not found');
      await user.destroy();
      return user;
    }
  },
  createPost: {
    type: PostType,
    args: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      content: { type: new GraphQLNonNull(GraphQLString) },
      userId: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(parent, args) {
      return await Post.create({
        title: args.title,
        content: args.content,
        userId: args.userId
      });
    }
  },
  // Mutation to update user details
  updatePost: {
    type: PostType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }, // ID is required to update the user
      title: { type: GraphQLString },
      content: { type: GraphQLString },
      userId: { type: GraphQLID }
    },
    async resolve(parent, args) {
      // Fetch the user by ID
      const post = await Post.findByPk(args.id);
      if (!post) throw new Error('Post not found');

      // Update user's data if provided
      if (args.name !== undefined) post.name = args.name;
      if (args.email !== undefined) post.email = args.email;

      // Save changes to the database
      await post.save();
      return post;
    },
  },
  // Mutation to delete post by post id
  deletePost: {
    type: PostType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
      const post = await Post.findByPk(args.id);
      if (!post) throw new Error('Post not found');
      await post.destroy();
      return post;
    }
  },
  //Mutation to create comment
  createComment: {
    type: CommentType,
    args:{
      comment_text: {type: new GraphQLNonNull(GraphQLString)},
      postId: {type: new GraphQLNonNull(GraphQLID)},
      userId: {type: new GraphQLNonNull(GraphQLID)}
    },
    async resolve(parent, args){
      // Check if the user exists before creating the comment
      const user = await User.findByPk(args.userId);
      if (!user) {
        throw new Error("User does not exist");
      }

      return await Comment.create({
        comment_text: args.comment_text,
        postId: args.postId,
        userId: args.userId
    });
    }
  },
  //Mutation update comment by comment id
  updateComment: {
    type: CommentType,
    args: {
      id: {type: new GraphQLNonNull(GraphQLID)},
      comment_text: {type: new GraphQLNonNull(GraphQLString)},
      postId: {type: new GraphQLNonNull(GraphQLID)},
      userId: {type: new GraphQLNonNull(GraphQLID)}
    },
    async resolve(parent, args){
      const comment = await Comment.findByPk(args.id);
      if(!comment){
        throw new Error("Invalid comment request");
      }
      // set data for update
      if (args.comment_text !== undefined) comment.comment_text = args.comment_text;

      await comment.save();
      return comment;

    }
  },
  //Mutation delete comment by comment id
  deleteComment: {
    type: CommentType,
    args: {id: {type: new GraphQLNonNull(GraphQLID)}},
    async resolve(parent, args){
      const comment = await Comment.findByPk(args.id);
      if(!comment){
        throw new Error("comment Id not exist");
      }
      return await comment.destroy();
    }
  }
};

module.exports = Mutation;
