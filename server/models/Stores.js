const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Recommended: {
    type: Number,
    default: 0,
  },
  NotRecommended: {
    type: Number,
    default: 0,
  },
  solvedCases:{
    type:Number,
    default:0
  },
  picture: {
    type:String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  selling: [
    {
      type: {
        type: String,
        required: true,
      },
    },
  ],
});

const Store = mongoose.model('Store', storeSchema);
module.exports = Store;
