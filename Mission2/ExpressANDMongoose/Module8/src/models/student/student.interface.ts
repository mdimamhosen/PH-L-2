export type Name = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type Guardian = {
  name: string;
  contactNumber: string;
  relation: string;
};
export type Address = {
  permanentAddress: string;
  currentAddress: string;
};
export interface Student {
  id: string;
  name: Name;
  age: number;
  email: string;
  gender: 'Male' | 'Female';
  contactNumber: string;
  emergencyContactNumber: string;
  address?: Address;
  dateOfBirth: Date;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  guardian: Guardian;
  profilePicture?: string;
  isActive: boolean;
}
