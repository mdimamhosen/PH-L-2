import { AppError } from '../../utils/AppError';
import { User } from '../User/User.model';
import { IBlog } from './Blog.interface';
import httpStatus from 'http-status';
import Blog from './Blog.model';
import { genarateBlogId } from './Blog.utils';
import QueryBuilder from '../../builder/QueryBuiler';
import { BlogSearchAbleFields } from './Blog.constant';
import mongoose from 'mongoose';

const CreateBlog = async (userID: string, payload: IBlog) => {
  // is the author a valid user?
  const isAuthorValid = await User.findById(userID);
  if (!isAuthorValid) {
    throw new AppError('Author is not valid', httpStatus.NOT_FOUND);
  }

  const blogId = await genarateBlogId();

  payload.id = blogId;
  payload.author = new mongoose.Types.ObjectId(userID);

  const newBlog = (await Blog.create(payload)).populate('author');

  return newBlog;
};

const GetAllBlogs = async (query: Record<string, unknown>) => {
  const blogsQuery = new QueryBuilder(Blog.find().populate('author'), query)

    .search(BlogSearchAbleFields)
    .sortBy()
    .sortOrder()
    .filter()
    .fields();

  const allBlogs = await blogsQuery.QueryModel;

  return allBlogs;
};

const GetBlogById = async (id: string) => {
  const blog = await Blog.findById(id).populate('author');

  if (!blog) {
    throw new AppError('Blog not found', httpStatus.NOT_FOUND);
  }

  return blog;
};

const deleteBlog = async (id: string) => {
  const isBlogExist = await Blog.findById(id);
  if (!isBlogExist) {
    throw new AppError('Blog not found', httpStatus.NOT_FOUND);
  }

  const result = await Blog.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

const updateBlog = async (id: string, payload: Partial<IBlog>) => {
  const isBlogExist = await Blog.findById(id);

  if (!isBlogExist) {
    throw new AppError('Blog not found', httpStatus.NOT_FOUND);
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('author');
  if (!updatedBlog) {
    throw new AppError(
      "Blog can't be updated",
      httpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  return updatedBlog;
};

export const BlogService = {
  CreateBlog,
  GetBlogById,
  GetAllBlogs,
  deleteBlog,
  updateBlog,
};
