import { AppError } from '../../utils/AppError';
import { User } from '../User/User.model';
import { IBlog } from './Blog.interface';
import httpStatus from 'http-status';
import Blog from './Blog.model';
import { genarateBlogId } from './Blog.utils';
import QueryBuilder from '../../builder/QueryBuiler';
import { BlogSearchAbleFields } from './Blog.constant';

const CreateBlog = async (payload: IBlog) => {
  // is the author a valid user?
  const isAuthorValid = await User.findById(payload.author);
  if (!isAuthorValid) {
    throw new AppError('Author is not valid', httpStatus.NOT_FOUND);
  }

  const blogId = await genarateBlogId();

  payload.id = blogId;

  const newBlog = await Blog.create(payload);

  return newBlog;
};

const GetAllBlogs = async (query: Record<string, unknown>) => {
  const blogsQuery = new QueryBuilder(Blog.find().populate('author'), query)
    .filter()
    .sortBy()
    .search(BlogSearchAbleFields)
    .fields()
    .sortOrder();

  const allBlogs = await blogsQuery.QueryModel;

  return allBlogs;
};

export const BlogService = {
  CreateBlog,

  GetAllBlogs,
};
