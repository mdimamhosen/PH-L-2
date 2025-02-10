import catchAsyncResponse from '../../utils/catchAsyncResponse';
import sendResponse from '../../utils/sendResponse';
import { BlogService } from './Blog.service';

const createBlog = catchAsyncResponse(async (req, res) => {
  const user = req.user;
  // console.log('userID', user?._id);
  const result = await BlogService.CreateBlog(user?._id, req.body);

  sendResponse(res, {
    success: true,
    data: result,
    message: 'Blog created successfully',
    statusCode: 201,
  });
});

const getAllBlogs = catchAsyncResponse(async (req, res) => {
  const result = await BlogService.GetAllBlogs(req.query);

  sendResponse(res, {
    success: true,
    data: result,
    message: 'All blogs fetched successfully',
    statusCode: 200,
  });
});

const getBlogById = catchAsyncResponse(async (req, res) => {
  console.log('req.params.blogId', req.params.id);
  const result = await BlogService.GetBlogById(req.params.id);

  sendResponse(res, {
    success: true,
    data: result,
    message: 'Blog fetched successfully',
    statusCode: 200,
  });
});

const deleteBlog = catchAsyncResponse(async (req, res) => {
  const result = await BlogService.deleteBlog(req.params.id);

  sendResponse(res, {
    success: true,
    data: result,
    message: 'Blog deleted successfully',
    statusCode: 200,
  });
});

const deleteBlogByAdmin = catchAsyncResponse(async (req, res) => {
  await BlogService.deleteBlog(req.params.id);

  sendResponse(res, {
    success: true,

    message: 'Blog deleted successfully',
    statusCode: 200,
  });
});

const updateBlog = catchAsyncResponse(async (req, res) => {
  const result = await BlogService.updateBlog(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    data: result,
    message: 'Blog updated successfully',
    statusCode: 200,
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  deleteBlog,
  getBlogById,
  updateBlog,
  deleteBlogByAdmin,
};
