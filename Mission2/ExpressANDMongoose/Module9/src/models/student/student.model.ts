import { Schema, model } from "mongoose";
import {
  Student,
  Address,
  Name,
  Guardian,
  StudentStaticMethodModel,
  // StudentMethod,
  // StudentModelMethod,
} from "./student.interface";
import validator from "validator";
import bcrypt from "bcrypt";
import config from "../../app/config";

const userNameSchema = new Schema<Name>({
  firstName: {
    type: String,
    required: [true, "First name is required."],
    trim: true,
    maxlength: [8, "First name cannot be more than 8 characters"],
    minlength: [3, "First name cannot be less than 3 characters"],
    validate: {
      validator: (value: string) => {
        return validator.isAlpha(value);
      },
      message: "{VALUE} is not a valid first name",
    },
  },
  middleName: {
    type: String,
    validate: {
      validator: function (value: string) {
        if (value) {
          return validator.isAlpha(value);
        }
        return true;
      },
      message: "{VALUE} is not a valid middle name",
    },
  },
  lastName: {
    type: String,
    required: [true, "Last name is required."],
    trim: true,
    maxlength: 8,
    minlength: 3,
    validate: {
      validator: function (value: string) {
        return value.charAt(0).toUpperCase() + value.slice(1) === value;
      },
      message: "{VALUE} is not a valid last name",
    },
  },
});

const addressSchema = new Schema<Address>({
  permanentAddress: {
    type: String,
    required: [true, "Please provide a valid permanent address"],
  },
  currentAddress: {
    type: String,
    required: [true, "Please provide a valid current address"],
  },
});

const guardianSchema = new Schema<Guardian>({
  name: {
    type: String,
    required: [true, "Please provide a valid guardian name"],
  },
  contactNumber: {
    type: String,
    required: [true, "Please provide a valid guardian contact number"],
  },
  relation: {
    type: String,
    required: [true, "Please provide a valid guardian relation"],
  },
});

// const StudentSchema = new Schema<Student, StudentMethod, StudentModelMethod>({
const StudentSchema = new Schema<Student, StudentStaticMethodModel>(
  {
    id: {
      type: String,
      required: [true, "Please provide a valid id"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a valid password"],
    },
    name: { type: userNameSchema, required: true },
    age: { type: Number, required: [true, "Please provide a valid age"] },
    email: {
      type: String,
      required: [true, "Please provide a valid email"],
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "{VALUE} is not a valid email",
      },
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female"],
        message: "{VALUE} is not supported",
      },
      required: [true, "Please provide a valid gender"],
    },
    contactNumber: {
      type: String,
      required: [true, "Please provide a valid contact number"],
    },
    emergencyContactNumber: {
      type: String,
      required: [true, "Please provide a valid emergency contact number"],
    },
    address: { type: addressSchema, required: true }, // Correct embedding
    dateOfBirth: {
      type: Date,
      required: [true, "Please provide a valid date of birth"],
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    guardian: { type: guardianSchema, required: true }, // Correct embedding
    profilePicture: { type: String, default: "" },
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtuals
StudentSchema.virtual("fullName").get(function (this: Student) {
  return `${this.name.firstName} ${this.name.middleName ? this.name.middleName : ""} ${this.name.lastName}`;
});

// Document middleware

StudentSchema.pre("save", async function (next) {
  if (!this.profilePicture && this.name.firstName && this.name.lastName) {
    this.profilePicture = `https://ui-avatars.com/api/?name=${this.name.firstName}+${this.name.lastName}&background=random&color=fff`;
  }
  console.log("Student saved successfully and logging from pre hook", this);
  const hashedPassword = bcrypt.hash(this.password, Number(config.bcryptSalt));
  this.password = await hashedPassword;
  next();
});

StudentSchema.post("save", function (doc, next) {
  doc.password = "********";
  console.log("Student saved successfully and logging from post hook", doc);
  next();
});

// Query middleware
StudentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
StudentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Aggregation middleware

StudentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({
    $match: {
      isDeleted: { $ne: true },
    },
  });
  next();
});

// Creating a custom instance method
// StudentSchema.methods.isUserExist = async function (id: string) {
//   const existingUser = await StudentModel.findOne({ id: id });
//   return existingUser;
// };

// const StudentModel = model<Student, StudentModelMethod>('Student', StudentSchema);

// Creating a custom static method

StudentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id: id });
  return existingUser;
};

const StudentModel = model<Student, StudentStaticMethodModel>(
  "Student",
  StudentSchema,
);
export default StudentModel;
