const Blog = require("../models/blog");
const asynHandler = require("express=async-handler");

const createNewBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  if (title || !description || !category) throw new Error("Missing inputs");
  const response = await Blog.create(req.body);
  return res.json({
    success: response ? true : false,
    createdBlog: response ? response : "Cannot create new blog",
  });
});
const updateBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (Object.keys(req.body).length == 0) throw new Error("Missing inputs");
  const response = await Blog.findByIdAnUpdate(bid, req.body, { new: true });
  return res.json({
    success: response ? true : false,
    createdBlog: response ? response : "Cannot create blog",
  });
});
const getBlogs = asyncHandler(async (req, res) => {
  const response = await Blog.find();
  return res.json({
    success: response ? true : false,
    createdBlog: response ? response : "Cannot get blog",
  });
});
// Like
// Dislike
/* 
Khi người dùng like một bài blog thì :
1. Check xem người đó trước đó có dislike hay không => bỏ dislike
2. Check xem người đó trước đó có like hay không => bỏ like/thêm like
*/
//pull
//push
const likeBlog = asynHandler(async () => {
  const { _id } = req.user;
  const { bid } = req.body;
  if (!bid) throw new Error("Missing inputs");
  const blog = await Blog.findById(bid);
  const alreadyDisliked = blod?.dislikes?.find((el) => el.toString() === _id);
  if (alreadyDisliked) {
    const reponse = await Blog.findByIdAnUpdate(
      bid,
      { Spull: { dislikes: _id }, isDisliked: false },
      { new: true }
    );
    return res.json({
      success: reponse ? true : false,
      rs: reponse,
    });
  }
  const isLiked = blog?.isLiked;
  if (isLiked) {
    const reponse = await Blog.findByIdAnUpdate(
      bid,
      { $pull: { likes: _id }, isLiked: false },
      { new: true }
    );
    return res.json({
      success: reponse ? true : false,
      rs: reponse,
    });
  } else {
    const reponse = await Blog.findByIdAnUpdate(
      bid,
      { $push: { likes: _id }, isLiked: true },
      { new: true }
    );
  }
});
module.exports = {
  createNewBlog,
  updateBlog,
  getBlogs,
};
