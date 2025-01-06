import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../app/config';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      validator: (value: string) => value.length >= 6 && value.length <= 20,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'student', 'faculty'],
        message: '{VALUE} is not supported',
      },
    },
    status: {
      type: String,
      enum: {
        values: ['in-progress', 'blocked'],
        message: '{VALUE} is not supported',
      },
      default: 'in-progress',
    },
  },
  {
    timestamps: true,
  },
);
// Document middleware

userSchema.pre('save', async function (next) {
  if (this.password) {
    const hashedPassword = await bcrypt.hash(
      this.password,
      Number(config.bcryptSalt),
    );
    this.password = hashedPassword;
  }
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '********';
  next();
});

const UserModel = model<TUser>('User', userSchema);

export default UserModel;
