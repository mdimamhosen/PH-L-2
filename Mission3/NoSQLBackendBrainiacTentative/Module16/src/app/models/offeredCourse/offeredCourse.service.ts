import { AppError } from '../../utils/AppError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import Course from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { SemesterRegistration } from '../semisterRegistration/semReg.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { hasTimeConflict } from './offeredCourse.utils';

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

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
};
