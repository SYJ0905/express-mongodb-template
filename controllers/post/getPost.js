const { successHandler, errorHandler } = require('../../responseHandler');
const { message, statusCodes } = require('../../libs');
const Post = require('../../models/post');

const getPosts = async (data) => {
  const { res } = data;
  const posts = await Post.find();
  successHandler(res, posts);
};

const getPost = async (data) => {
  const { req, res } = data;
  const { noData } = message;
  const { id } = req.params;

  try {
    /** mongoose id 24碼 輸入錯誤仍回傳 success 但 response data 為 null，需額外判斷 */
    const post = await Post.findOne(
      {
        _id: id,
      },
    );
    if (post) {
      successHandler(res, post);
      return;
    }
    errorHandler(res, statusCodes.requestError, noData);
    return;
  } catch (error) {
    errorHandler(res, statusCodes.requestError, noData);
  }
};

module.exports = {
  getPosts,
  getPost,
};
