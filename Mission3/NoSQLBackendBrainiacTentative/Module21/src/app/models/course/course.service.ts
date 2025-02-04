import QueryBuilder from '../../builder/QueryBuilder';
import { TCourse, TCourseFaculty } from './course.interface';
import Course, { CourseFaculty } from './course.model';
import { CourseSeachableFields } from './course.constant';
import { AppError } from '../../utils/AppError';

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

export const updateCourseIntoDB = async (
  id: string,
  course: Partial<TCourse>,
) => {
  const { preRequisiteCourses, ...rest } = course;
  const session = await Course.startSession();

  try {
    await session.startTransaction();

    // Step 1: Update basic course information
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(id, rest, {
      new: true,
      runValidators: true,
      session,
    });

    if (!updatedBasicCourseInfo) {
      throw new AppError(404, 'Course not found');
    }

    // Step 2: Update preRequisiteCourses
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPreRequisiteCourses = preRequisiteCourses
        .filter(element => element.course && element.isDeleted === true)
        .map(element => element.course);

      const updatedPreRequisiteCourses = preRequisiteCourses.filter(
        element => element.course && element.isDeleted !== true,
      );

      // Remove deleted preRequisiteCourses
      if (deletedPreRequisiteCourses.length > 0) {
        const deleteResult = await Course.findByIdAndUpdate(
          id,
          {
            $pull: {
              preRequisiteCourses: {
                course: { $in: deletedPreRequisiteCourses }, // Match course IDs
              },
            },
          },
          { new: true, session },
        );

        if (!deleteResult) {
          throw new AppError(
            404,
            'Course not found during deletion of pre-requisites',
          );
        }
      }

      // Add updated preRequisiteCourses (only if not already present)
      if (updatedPreRequisiteCourses.length > 0) {
        const courseDocument = await Course.findById(id).session(session);

        if (!courseDocument) {
          throw new AppError(
            404,
            'Course not found during addition of pre-requisites',
          );
        }

        const existingCourses = courseDocument.preRequisiteCourses.map(
          prerequisite => prerequisite.course.toString(),
        );

        const filteredCoursesToAdd = updatedPreRequisiteCourses.filter(
          newCourse => !existingCourses.includes(newCourse.course.toString()),
        );

        if (filteredCoursesToAdd.length > 0) {
          const addResult = await Course.findByIdAndUpdate(
            id,
            {
              $addToSet: {
                preRequisiteCourses: {
                  $each: filteredCoursesToAdd,
                },
              },
            },
            { new: true, session },
          );

          if (!addResult) {
            throw new AppError(
              404,
              'Course not found during addition of pre-requisites',
            );
          }
        }
      }
    }

    // Step 3: Populate the updated course
    const updatedCourse = await Course.findById(id)
      .populate('preRequisiteCourses.course')
      .session(session);

    if (!updatedCourse) {
      throw new AppError(404, 'Failed to retrieve updated course');
    }

    // Commit the transaction
    await session.commitTransaction();
    await session.endSession();

    return updatedCourse;
  } catch (error) {
    // Abort the transaction in case of an error
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
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

const assignFacultiesWithCourseIntoDB = async (
  courseId: string,
  payload: Partial<TCourseFaculty>,
) => {
  const isCourseExist = await Course.findById(courseId);
  if (!isCourseExist) {
    throw new AppError(404, 'Course not found');
  }
  const result = await CourseFaculty.findByIdAndUpdate(
    courseId,
    {
      course: courseId,
      $addToSet: {
        faculties: {
          $each: payload,
        },
      },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};

const removeFacultiesFromCourseIntoDB = async (
  courseId: string,
  payload: Partial<TCourseFaculty>,
) => {
  const isCourseExist = await Course.findById(courseId);
  if (!isCourseExist) {
    throw new AppError(404, 'Course not found');
  }
  const result = await CourseFaculty.findByIdAndUpdate(
    courseId,
    {
      course: courseId,
      $pull: {
        faculties: {
          $in: payload,
        },
      },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};

const getFacultiesFromCourse = async (courseId: string) => {
  const faculties = await CourseFaculty.findOne({ course: courseId }).populate(
    'faculties',
  );
  return faculties;
};

export const CourseServices = {
  createCourse,
  getAllCoursesFromDB,
  getCourseByIdFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseIntoDB,
  getFacultiesFromCourse,
};
