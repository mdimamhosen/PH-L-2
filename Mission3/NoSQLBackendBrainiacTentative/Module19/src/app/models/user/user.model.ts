import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(user.password, Number(10));
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExist = async function (id: string) {
  const isUser = await User.findOne({ id }).select('password');
  if (!isUser) return false;
  return true;
};
userSchema.statics.isUserBlocked = async function (id: string) {
  const isUser = await User.findOne({ id, status: 'blocked' }).select(
    'password',
  );
  if (!isUser) return false;
  return true;
};

userSchema.statics.isUserDeleted = async function (id: string) {
  const isUser = await User.findOne({ id, isDeleted: true });
  if (!isUser) return false;
  return true;
};

userSchema.statics.isPasswordMatched = async function (
  password: string,
  id: string,
) {
  const user = await User.findOne({ id }).select('password');
  if (!user) return false;
  const isPass = await bcrypt.compare(password, user.password);
  if (!isPass) return false;
  return true;
};

userSchema.statics.isJwtIssuedBeforePasswordChange = function (
  passwordChangeTimeStamp: Date,
  jwtIssuedTimeStamp: number,
) {
  console.log({
    passwordChangeTimeStamp: passwordChangeTimeStamp.getTime() / 1000,
    jwtIssuedTimeStamp: jwtIssuedTimeStamp,
  });
  if (passwordChangeTimeStamp.getTime() / 1000 > jwtIssuedTimeStamp) {
    return true;
  }
  return false;
};

export const User = model<TUser, UserModel>('User', userSchema);
