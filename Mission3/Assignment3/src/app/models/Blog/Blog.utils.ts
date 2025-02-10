import Blog from './Blog.model';

export const genarateBlogId = async () => {
  let currentBlogId = (0).toString().padStart(4, '0');

  const lastBlogId = await findLastBlogId();

  if (lastBlogId) {
    const lastIdNumber = parseInt(lastBlogId, 10);
    const newIdNumber = lastIdNumber + 1;
    currentBlogId = newIdNumber.toString().padStart(4, '0');
  } else {
    currentBlogId = (Number(currentBlogId) + 1).toString().padStart(4, '0');
  }
  const blogId = `B-${currentBlogId}`;

  return blogId;
};

const findLastBlogId = async () => {
  const lastBlog = await Blog.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  console.log(await Blog.findOne({}, { id: 1, _id: 0 }));

  return lastBlog?.id ? lastBlog.id.substring(2) : undefined;
};
