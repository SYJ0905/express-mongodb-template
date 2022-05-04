const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '貼文姓名'],
    },
    tags: {
      type: Array,
      required: [true, '貼文標籤 tags'],
    },
    // tags: [
    //   {
    //     type: String,
    //     required: [true, '貼文標籤 tags'],
    //   },
    // ],
    type: {
      type: String,
      enum: ['group', 'person'],
      required: [true, '貼文類型 type'],
    },
    image: {
      type: String,
      default: '',
    },
    createAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
    content: {
      type: String,
      required: [true, 'Content'],
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    // timestamps: true,  // 自動加入 createdAt、updatedAt
  },
);

const Post = mongoose.model('posts', postSchema);

module.exports = Post;
