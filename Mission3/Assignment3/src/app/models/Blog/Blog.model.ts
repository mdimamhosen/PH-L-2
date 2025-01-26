import { Schema, model, Model } from 'mongoose';
import { IBlog } from './Blog.interface';

interface BlogModel extends Model<IBlog> {
  findNonDeleted(): Promise<IBlog[]>;
}

const BlogSchema = new Schema<IBlog, BlogModel>(
  {
    id: {
      type: String,
      required: [true, 'Id is required'],
      unique: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 255,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

BlogSchema.statics.findNonDeleted = function () {
  return this.find({ isDeleted: false });
};

const Blog = model<IBlog, BlogModel>('Blog', BlogSchema);

export default Blog;
