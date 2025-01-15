import QueryBuilder from '../../builder/QueryBuilder';
import { TCourse } from './course.interface';
import Course from './course.model';
import { CourseSeachableFields } from './course.constant';

const createCourse = async (course: TCourse) => {
  const result = await Course.create(course);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .pagination()
    .filter()
    .sort()
    .fields()
    .searchTerm(CourseSeachableFields);
  const result = await courseQuery.modelQuery;
  return result;
};

const getCourseByIdFromDB = async (id: string) => {
  const course = await Course.findById(id);
  return course;
};

const updateCourseIntoDB = async (id: string, course: Partial<TCourse>) => {
  const updatedCourse = await Course.findByIdAndUpdate(id, course, {
    new: true,
  });
  return updatedCourse;
};

const deleteCourseFromDB = async (id: string) => {
  const course = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return course;
};

export const CourseServices = {
  createCourse,
  getAllCoursesFromDB,
  getCourseByIdFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
};
