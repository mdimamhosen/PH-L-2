import { model, Schema } from 'mongoose';
import { FacultyModel, TFaculty, TUserName } from './faculty.interface';
import { BloodGroup, Gender } from './faculty.constant';

export const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [50, 'First Name can not be more than 50 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
    maxlength: [50, 'Last Name can not be more than 50 characters'],
  },
});

const facultySchema = new Schema<TFaculty, FacultyModel>(
  {
    id: {
      type: String,
      required: [true, 'Faculty ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
      unique: true,
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: '{VALUE} is not supported for gender.',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: Date,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    contactNo: {
      type: String,
      required: [true, 'Contact No is required'],
      trim: true,
      // match: [
      // /^\d{10}$/,
      // 'Please fill a valid 10 digit Contact No',
      // ],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact No is required'],
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: '{VALUE} is not supported for blood group.',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address is required'],
    },
    profileImg: {
      type: String,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: [true, 'Academic Department is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

// generating
facultySchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// filter out the deleted faculty

facultySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// checking if user is already exist
facultySchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Faculty.findOne({ id });
  return existingUser;
};

export const Faculty = model<TFaculty, FacultyModel>('Faculty', facultySchema);
