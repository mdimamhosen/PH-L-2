"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyValidation = exports.updateFacultyValidationSchema = exports.createFacultyValidationSchema = void 0;
const zod_1 = require("zod");
const faculty_constant_1 = require("./faculty.constant");
const facultyUserNameValidation = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(2, { message: 'First Name must be at least 2 characters long' })
        .max(50, { message: 'First Name cannot exceed 50 characters' })
        .refine(value => /^[A-Z]/.test(value.trim()), {
        message: 'First Name must start with a capital letter',
    }),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z
        .string()
        .min(1, { message: 'Last Name is required' })
        .max(50, { message: 'Last Name cannot exceed 50 characters' }),
});
exports.createFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z
            .string()
            .min(6, { message: 'Password must be at least 8 characters long' }),
        faculty: zod_1.z.object({
            designation: zod_1.z
                .string()
                .min(2, { message: 'Designation must be at least 2 characters long' }),
            name: facultyUserNameValidation,
            gender: zod_1.z.enum([...faculty_constant_1.Gender]),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z.string().email(),
            contactNo: zod_1.z.string(),
            emergencyContactNo: zod_1.z.string(),
            bloodGroup: zod_1.z.enum([...faculty_constant_1.BloodGroup]),
            presentAddress: zod_1.z.string(),
            permanentAddress: zod_1.z.string(),
            academicDepartment: zod_1.z.string(),
            profileImg: zod_1.z.string().optional(),
        }),
    }),
});
const updateFacultyUserNameValidation = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(2, { message: 'First Name must be at least 2 characters long' }),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().min(1, { message: 'Last Name is required' }),
});
exports.updateFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        faculty: zod_1.z.object({
            designation: zod_1.z.string().optional(),
            name: updateFacultyUserNameValidation.optional(),
            gender: zod_1.z.enum([...faculty_constant_1.Gender]).optional(),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z.string().email().optional(),
            contactNo: zod_1.z.string().optional(),
            emergencyContactNo: zod_1.z.string().optional(),
            bloodGroup: zod_1.z.enum([...faculty_constant_1.BloodGroup]).optional(),
            presentAddress: zod_1.z.string().optional(),
            permanentAddress: zod_1.z.string().optional(),
            academicDepartment: zod_1.z.string().optional(),
            profileImg: zod_1.z.string().optional(),
        }),
    }),
});
exports.FacultyValidation = {
    createFacultyValidationSchema: exports.createFacultyValidationSchema,
    updateFacultyValidationSchema: exports.updateFacultyValidationSchema,
};
