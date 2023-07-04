const mongoose = require('mongoose');
const User = require(`./User`)
const Store = require(`./Stores`)
const commentSchema = new mongoose.Schema({
  commenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: `User`,
    required: true,
  },
  commentedAt:{
    type:Date,
  },
  commentText: {
    type: String,
    required: true,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: `Store`,
    required: true,
  },
  status: {
    type: String,
    enum: ['Recommended', 'NotRecommended' , `Solved-Case`],
    default: 'Recommended',
  },
  solvedCase: {
    type: Boolean,
    default: false,
  },
  edited: {
    type: Boolean,
    default: false,
  },
  links:{
    type:String,
    required:false
  },
  upVotes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:`User`
  }],
  downVotes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:`User`
  }]
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
