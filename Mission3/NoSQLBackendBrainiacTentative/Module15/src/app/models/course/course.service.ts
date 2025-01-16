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
  const { preRequisiteCourses, ...rest } = course;

  // Step 1: Update basic course information
  await Course.findByIdAndUpdate(id, rest, {
    new: true,
    runValidators: true,
  });

  // Step 2: Update preRequisiteCourses
  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    const deletedPreRequisiteCourses = preRequisiteCourses
      .filter(element => element.course && element.isDeleted === true)
      .map(element => element.course);

    const updatedPreRequisiteCourses = preRequisiteCourses.filter(
      element => element.course && element.isDeleted !== true,
    );

    console.log({
      deletedPreRequisiteCourses,
      updatedPreRequisiteCourses,
    });

    // Remove deleted preRequisiteCourses
    if (deletedPreRequisiteCourses.length > 0) {
      await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: {
              course: { $in: deletedPreRequisiteCourses }, // Match course IDs
            },
          },
        },
        { new: true },
      );
    }

    // Add updated preRequisiteCourses (only if not already present)
    if (updatedPreRequisiteCourses.length > 0) {
      const courseDocument = await Course.findById(id);

      if (!courseDocument) {
        throw new Error('Course not found');
      }

      const existingCourses = courseDocument.preRequisiteCourses.map(
        prerequisite => prerequisite.course.toString(),
      );

      const filteredCoursesToAdd = updatedPreRequisiteCourses.filter(
        newCourse => !existingCourses.includes(newCourse.course.toString()),
      );

      if (filteredCoursesToAdd.length > 0) {
        await Course.findByIdAndUpdate(
          id,
          {
            $addToSet: {
              preRequisiteCourses: {
                $each: filteredCoursesToAdd,
              },
            },
          },
          { new: true },
        );
      }
    }
  }

  // Populate the updated course
  const updatedCourse = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );

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
