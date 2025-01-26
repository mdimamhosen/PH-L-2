import { model, Schema } from 'mongoose';
import { IUser, UserModel } from './User.interface';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: [true, 'Id is required'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [255, 'Name can not be more than 255 characters'],
      minlength: [3, 'Name can not be less than 3 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      validator: {
        validate: (value: string) => {
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
        },
        message: '{VALUE} is not a valid email',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
      minlength: [6, 'Password can not be less than 6 characters'],
      maxlength: [255, 'Password can not be more than 255 characters'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not supported',
      },
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
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

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(user.password, Number(10));
  next();
});
UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

UserSchema.statics.isUserExist = async function (email: string) {
  const isUser = await User.findOne({ email }).select('password');
  if (!isUser) return false;
  return true;
};
UserSchema.statics.isUserBlocked = async function (email: string) {
  const isUser = await User.findOne({ email, isBlocked: true }).select(
    'password',
  );
  if (!isUser) return false;
  return true;
};

UserSchema.statics.isUserDeleted = async function (email: string) {
  const isUser = await User.findOne({ email, isDeleted: true });
  if (!isUser) return false;
  return true;
};

UserSchema.statics.isPasswordMatched = async function (
  password: string,
  email: string,
) {
  const user = await User.findOne({ email }).select('password');
  if (!user) return false;
  const isPass = await bcrypt.compare(password, user.password);
  if (!isPass) return false;
  return true;
};

UserSchema.statics.isJwtIssuedBeforePasswordChange = function (
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
export const User = model<IUser, UserModel>('User', UserSchema);
