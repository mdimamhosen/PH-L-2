import { Schema, model } from 'mongoose';
import { Student, Address, Name, Guardian } from './student.interface';

const userNameSchema = new Schema<Name>({
  firstName: { type: String, required: [true, 'First name is required.'] },
  middleName: { type: String },
  lastName: { type: String, required: [true, 'Last name is required.'] },
});

const addressSchema = new Schema<Address>({
  permanentAddress: {
    type: String,
    required: [true, 'Please provide a valid permanent address'],
  },
  currentAddress: {
    type: String,
    required: [true, 'Please provide a valid current address'],
  },
});

const guardianSchema = new Schema<Guardian>({
  name: {
    type: String,
    required: [true, 'Please provide a valid guardian name'],
  },
  contactNumber: {
    type: String,
    required: [true, 'Please provide a valid guardian contact number'],
  },
  relation: {
    type: String,
    required: [true, 'Please provide a valid guardian relation'],
  },
});

const StudentSchema = new Schema<Student>({
  id: { type: String, required: [true, 'Please provide a valid id'] },
  name: { type: userNameSchema, required: true }, // Correct embedding
  age: { type: Number, required: [true, 'Please provide a valid age'] },
  email: { type: String, required: [true, 'Please provide a valid email'] },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: [true, 'Please provide a valid gender'],
  },
  contactNumber: {
    type: String,
    required: [true, 'Please provide a valid contact number'],
  },
  emergencyContactNumber: {
    type: String,
    required: [true, 'Please provide a valid emergency contact number'],
  },
  address: { type: addressSchema, required: true }, // Correct embedding
  dateOfBirth: {
    type: Date,
    required: [true, 'Please provide a valid date of birth'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  guardian: { type: guardianSchema, required: true }, // Correct embedding
  profilePicture: { type: String, default: '' },
  isActive: { type: Boolean, default: false },
});

StudentSchema.pre('save', function (next) {
  if (!this.profilePicture && this.name.firstName && this.name.lastName) {
    this.profilePicture = `https://ui-avatars.com/api/?name=${this.name.firstName}+${this.name.lastName}&background=random&color=fff`;
  }
  next();
});

const StudentModel = model<Student>('Student', StudentSchema);
export default StudentModel;
