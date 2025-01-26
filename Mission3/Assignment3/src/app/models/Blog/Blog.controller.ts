import catchAsyncResponse from '../../utils/catchAsyncResponse';
import sendResponse from '../../utils/sendResponse';
import { BlogService } from './Blog.service';

const createBlog = catchAsyncResponse(async (req, res) => {
  const result = await BlogService.CreateBlog(req.body);

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

export const BlogController = {
  createBlog,
  getAllBlogs,
};
