import { AppError } from '../../utils/AppError';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import { TEnrolledCourse } from './EnrolledCourse.interface';
import httpStatus from 'http-status';
import EnrolledCourse from './EnrolledCourse.model';
import { Student } from '../student/student.model';
import mongoose from 'mongoose';
import { SemesterRegistration } from '../semisterRegistration/semReg.model';
import Course from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { calculateGradeAndgradePoints } from './EnrolledCourse.utils';

const createEnrolledCourse = async (id: string, payload: TEnrolledCourse) => {
  const { offeredCourse } = payload;

  const isOfferedCourseExist = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found');
  }
  if (isOfferedCourseExist.maxCapacity <= 0) {
    throw new AppError(httpStatus.CONFLICT, 'Offered course is full');
  }

  const student = await Student.findOne({ id: id }).select('_id');

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExist?.semesterRegistration,
    offeredCourse,
    student: student?._id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, 'Student already enrolled');
  }

  const semesterRegistration = await SemesterRegistration.findById(
    isOfferedCourseExist?.semesterRegistration,
  ).select('maxCredit');

  if (!semesterRegistration) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found');
  }

  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExist?.semesterRegistration,
        student: student?._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'courseData',
      },
    },
    {
      $unwind: '$courseData',
    },
    {
      $group: {
        _id: null,
        totalCredit: { $sum: '$courseData.credits' },
      },
    },
    {
      $project: {
        _id: 0,
        totalCredit: 1,
      },
    },
  ]);

  const course = await Course.findById(isOfferedCourseExist?.course).select(
    'credits',
  );

  const totalcredits =
    enrolledCourses.length > 0 ? enrolledCourses[0].totalCredit : 0;

  if (totalcredits + course?.credits > semesterRegistration.maxCredit) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Student has exceeded the maximum credit limit',
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await EnrolledCourse.create({
      semesterRegistration: isOfferedCourseExist?.semesterRegistration,
      academicSemester: isOfferedCourseExist?.academicSemester,
      academicFaculty: isOfferedCourseExist?.academicFaculty,
      academicDepartment: isOfferedCourseExist?.academicDepartment,
      offeredCourse,
      course: isOfferedCourseExist?.course,
      student: student?._id,
      faculty: isOfferedCourseExist?.faculty,
      isEnrolled: true,
    });
    if (!result) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Enrolled course not created',
      );
    }

    await OfferedCourse.findByIdAndUpdate(offeredCourse, {
      $inc: { maxCapacity: -1 },
    });

    await session.commitTransaction();
    session.endSession();

    return result;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateEnrolledCourseMarks = async (
  facultyID: string,
  payload: Partial<TEnrolledCourse>,
) => {
  console.log('payload', payload);
  console.log('facultyID', facultyID);

  const { semesterRegistration, offeredCourse, student, courseMarks } = payload;
  const isOfferedCourseExist = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found');
  }

  const isSemeseterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemeseterRegistrationExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found');
  }

  const isStudentExist = await Student.findById(student);
  if (!isStudentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const faculty = await Faculty.findOne({ id: facultyID }).select('_id');
  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  const enrolledCourse = await EnrolledCourse.findOne({
    semesterRegistration,
    offeredCourse,
    student,
    faculty: faculty?._id,
  });

  if (!enrolledCourse) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Enrolled course not found for this faculty',
    );
  }

  const modifiedData: Record<string, unknown> = {
    ...courseMarks,
  };

  if (Object.keys(modifiedData).length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data to update');
  }

  if (courseMarks?.finalTerm) {
    const { classTest1, midTerm, classTest2 } = enrolledCourse.courseMarks;
    const finalTerm = courseMarks.finalTerm;

    const totalMarks = Math.ceil(
      classTest1 * 0.1 + midTerm * 0.3 + classTest2 * 0.1 + finalTerm * 0.5,
    );
    const result = calculateGradeAndgradePoints(totalMarks);
    modifiedData.grade = result.grade;
    modifiedData.gradePoints = result.gradePoints;
  }

  if (courseMarks && Object.keys(courseMarks).length > 0) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value;
    }
  }

  const result = await EnrolledCourse.findByIdAndUpdate(
    enrolledCourse._id,
    modifiedData,
    { new: true },
  );
  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Enrolled course marks not updated',
    );
  }
  return result;
};

export const EnrolledCourseService = {
  createEnrolledCourse,
  updateEnrolledCourseMarks,
};
