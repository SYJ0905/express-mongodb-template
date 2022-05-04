const { successHandler, errorHandler } = require('../../responseHandler');
const { message, statusCodes, validateFieldKeyExist } = require('../../libs');
const Post = require('../../models/post');

const addPost = async (data) => {
  const { req, res } = data;
  const { formatFail } = message;

  try {
    const post = req.body;

    const fieldValidate = validateFieldKeyExist(Post, post);

    if (fieldValidate.status) {
      await Post.create(
        {
          name: post.name || undefined,
          tags: post.tags || undefined,
          type: post.type || undefined,
          image: post.image || undefined,
          content: post.content || undefined,
          likes: post.likes || undefined,
          comments: post.comments || undefined,
        },
      )
        .then(async () => {
          const posts = await Post.find();
          successHandler(res, posts);
        })
        .catch((error) => {
          errorHandler(res, statusCodes.requestError, error);
        });
    } else {
      errorHandler(res, statusCodes.requestError, fieldValidate, 9998);
    }
  } catch (error) {
    errorHandler(res, statusCodes.requestError, `${formatFail}，新增失敗`);
  }
};

module.exports = addPost;
