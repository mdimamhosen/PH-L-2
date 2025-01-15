import { TCourse } from './course.interface';
import Course from './course.model';

const createCourse = async (course: TCourse) => {
  const result = await Course.create(course);
  return result;
};

const getAllCoursesFromDB = async () => {
  const courses = await Course.find();
  return courses;
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
