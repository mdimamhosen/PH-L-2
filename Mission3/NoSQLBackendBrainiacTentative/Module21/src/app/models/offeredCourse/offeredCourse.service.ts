import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../utils/AppError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import Course from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { SemesterRegistration } from '../semisterRegistration/semReg.model';
import { Student } from '../student/student.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { hasTimeConflict } from './offeredCourse.utils';
import httpStatus from 'http-status';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload;

  const isSemesterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExist) {
    throw new AppError(404, 'Semester Registration not found');
  }
  const isAcademicFacultyExist =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExist) {
    throw new AppError(404, 'Academic Faculty not found');
  }
  const isAcademicDepartmentExist =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentExist) {
    throw new AppError(404, 'Academic Department not found');
  }
  const isCourseExist = await Course.findById(course);
  if (!isCourseExist) {
    throw new AppError(404, 'Course not found');
  }
  const isFacultyExist = await Faculty.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(404, 'Faculty not found');
  }

  const academicSemester = isSemesterRegistrationExist.academicSemester;

  //   check if the department is belong to the faculty

  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    academicFaculty,
    _id: academicDepartment,
  });

  //   console.log({
  //     isDepartmentBelongToFaculty,
  //     isAcademicDepartmentExist,
  //     isAcademicFacultyExist,
  //   });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(400, 'Department does not belong to the faculty');
  }

  const isSameOfferedCourseExistWithSameSection = await OfferedCourse.findOne({
    semesterRegistration,
    section: payload.section,
    course,
  });

  if (isSameOfferedCourseExistWithSameSection) {
    throw new AppError(400, 'Same course with same section already exist');
  }

  //   get the schedule of the faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: payload.days },
  }).select('days startTime endTime -_id');

  const newPayloadSchedule = {
    days: payload.days,
    startTime: payload.startTime,
    endTime: payload.endTime,
  };

  const isItHasTimeConflict = hasTimeConflict(
    assignedSchedules,
    newPayloadSchedule,
  );

  if (isItHasTimeConflict) {
    throw new AppError(400, 'Time conflict with the assigned schedule');
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await offeredCourseQuery.modelQuery;
  return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const offeredCourse = await OfferedCourse.findById(id);

  if (!offeredCourse) {
    throw new AppError(404, 'Offered Course not found');
  }

  return offeredCourse;
};

const deleteOfferedCourseFromDB = async (id: string) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the semester registration status is upcoming
   * Step 3: delete the offered course
   */
  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found');
  }

  const semesterRegistation = isOfferedCourseExists.semesterRegistration;

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistation).select('status');

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course can not update ! because the semester ${semesterRegistrationStatus}`,
    );
  }

  const result = await OfferedCourse.findByIdAndDelete(id);

  return result;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(404, 'Offered Course not found');
  }

  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration).select('status');

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course can not update ! because the semester ${semesterRegistrationStatus}`,
    );
  }

  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime -_id');

  const newPayloadSchedule = {
    days,
    startTime,
    endTime,
  };

  const isItHasTimeConflict = hasTimeConflict(
    assignedSchedules,
    newPayloadSchedule,
  );

  if (isItHasTimeConflict) {
    throw new AppError(400, 'Time conflict with the assigned schedule');
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const getMyOfferedCoursesFromDB = async (facultyId: string) => {
  const student = await Student.findOne({ id: facultyId }).populate('user');
  if (!student) {
    throw new AppError(404, 'Student not found');
  }
  // get current semester
  const currentSemester = await SemesterRegistration.findOne({
    status: 'ONGOING',
  });

  if (!currentSemester) {
    throw new AppError(404, 'There is no ongoing semester');
  }

  const result = await OfferedCourse.aggregate([
    {
      $match: {
        semesterRegistration: currentSemester?._id,
        academicDepartment: student.academicDepartment,
        academicFaculty: student.academicFaculty,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'course',
      },
    },
  ]);
  // {
  // $unwind: '$course',
  // },
  // {
  //   $lookup:{
  //     from: 'enrolledcourses',
  //     pipeline:[
  //       {
  //         $match:{
  //           $expr:{
  //             $and:[
  //               { $eq: ['$offeredCourse', '$_id'] },
  //               { $eq: ['$student', student._id] }
  //             ]
  //           }
  //         }
  //       }
  //     ]
  //   }
  // }

  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
  deleteOfferedCourseFromDB,
  getMyOfferedCoursesFromDB,
};
