const { successHandler, errorHandler } = require('../../responseHandler');
const {
  message,
  statusCodes,
  validateFieldKeyExist,
  validateFieldRequired,
} = require('../../libs');
const Post = require('../../models/post');

const patchPost = async (data) => {
  const { req, res } = data;
  const { noData } = message;
  const { id } = req.params;

  try {
    const post = req.body;
    const fieldValidate = validateFieldKeyExist(Post, post);

    if (fieldValidate.status) {
      const fieldRequired = validateFieldRequired(Post, post);
      if (fieldRequired.status) {
        const resPost = await Post.findByIdAndUpdate(id, post);
        if (resPost) {
          const posts = await Post.find();
          successHandler(res, posts);
          return;
        }
      } else {
        errorHandler(
          res,
          statusCodes.requestError,
          fieldRequired,
          statusCodes.requestPayloadKeyRequired,
        );
        return;
      }
      errorHandler(res, statusCodes.requestError, noData);
      return;
    }
    errorHandler(res, statusCodes.requestError, fieldValidate, statusCodes.requestPayloadKeyError);
    return;
  } catch (error) {
    errorHandler(res, statusCodes.requestError, noData);
  }
};

module.exports = patchPost;
