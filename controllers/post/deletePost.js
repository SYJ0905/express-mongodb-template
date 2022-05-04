const { successHandler, errorHandler } = require('../../responseHandler');
const { message, statusCodes } = require('../../libs');
const Post = require('../../models/post');

const deletePosts = async (data) => {
  const { res } = data;
  await Post.deleteMany({});
  const posts = await Post.find();
  successHandler(res, posts);
};

const deletePost = async (data) => {
  const { req, res } = data;
  const { noData } = message;
  const { id } = req.params;

  try {
    /** mongoose id 24碼 輸入錯誤仍回傳 success 但 response data 為 null，需額外判斷 */
    const post = await Post.findByIdAndDelete(id);
    if (post) {
      const posts = await Post.find();
      successHandler(res, posts);
      return;
    }
    errorHandler(res, statusCodes.requestError, noData);
    return;
  } catch (error) {
    errorHandler(res, statusCodes.requestError, noData);
  }
};

module.exports = {
  deletePosts,
  deletePost,
};
