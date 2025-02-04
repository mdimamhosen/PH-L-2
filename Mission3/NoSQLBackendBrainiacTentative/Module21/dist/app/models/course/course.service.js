"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseServices = exports.updateCourseIntoDB = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const course_model_1 = __importStar(require("./course.model"));
const course_constant_1 = require("./course.constant");
const AppError_1 = require("../../utils/AppError");
const createCourse = (course) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.default.create(course);
    return result;
});
const getAllCoursesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.default(course_model_1.default.find().populate('preRequisiteCourses.course'), query)
        .pagination()
        .filter()
        .sort()
        .fields()
        .searchTerm(course_constant_1.CourseSeachableFields);
    const result = yield courseQuery.modelQuery;
    return result;
});
const getCourseByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.default.findById(id);
    return course;
});
const updateCourseIntoDB = (id, course) => __awaiter(void 0, void 0, void 0, function* () {
    const { preRequisiteCourses } = course, rest = __rest(course, ["preRequisiteCourses"]);
    const session = yield course_model_1.default.startSession();
    try {
        yield session.startTransaction();
        // Step 1: Update basic course information
        const updatedBasicCourseInfo = yield course_model_1.default.findByIdAndUpdate(id, rest, {
            new: true,
            runValidators: true,
            session,
        });
        if (!updatedBasicCourseInfo) {
            throw new AppError_1.AppError(404, 'Course not found');
        }
        // Step 2: Update preRequisiteCourses
        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            const deletedPreRequisiteCourses = preRequisiteCourses
                .filter(element => element.course && element.isDeleted === true)
                .map(element => element.course);
            const updatedPreRequisiteCourses = preRequisiteCourses.filter(element => element.course && element.isDeleted !== true);
            // Remove deleted preRequisiteCourses
            if (deletedPreRequisiteCourses.length > 0) {
                const deleteResult = yield course_model_1.default.findByIdAndUpdate(id, {
                    $pull: {
                        preRequisiteCourses: {
                            course: { $in: deletedPreRequisiteCourses }, // Match course IDs
                        },
                    },
                }, { new: true, session });
                if (!deleteResult) {
                    throw new AppError_1.AppError(404, 'Course not found during deletion of pre-requisites');
                }
            }
            // Add updated preRequisiteCourses (only if not already present)
            if (updatedPreRequisiteCourses.length > 0) {
                const courseDocument = yield course_model_1.default.findById(id).session(session);
                if (!courseDocument) {
                    throw new AppError_1.AppError(404, 'Course not found during addition of pre-requisites');
                }
                const existingCourses = courseDocument.preRequisiteCourses.map(prerequisite => prerequisite.course.toString());
                const filteredCoursesToAdd = updatedPreRequisiteCourses.filter(newCourse => !existingCourses.includes(newCourse.course.toString()));
                if (filteredCoursesToAdd.length > 0) {
                    const addResult = yield course_model_1.default.findByIdAndUpdate(id, {
                        $addToSet: {
                            preRequisiteCourses: {
                                $each: filteredCoursesToAdd,
                            },
                        },
                    }, { new: true, session });
                    if (!addResult) {
                        throw new AppError_1.AppError(404, 'Course not found during addition of pre-requisites');
                    }
                }
            }
        }
        // Step 3: Populate the updated course
        const updatedCourse = yield course_model_1.default.findById(id)
            .populate('preRequisiteCourses.course')
            .session(session);
        if (!updatedCourse) {
            throw new AppError_1.AppError(404, 'Failed to retrieve updated course');
        }
        // Commit the transaction
        yield session.commitTransaction();
        yield session.endSession();
        return updatedCourse;
    }
    catch (error) {
        // Abort the transaction in case of an error
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
});
exports.updateCourseIntoDB = updateCourseIntoDB;
const deleteCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
    });
    return course;
});
const assignFacultiesWithCourseIntoDB = (courseId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isCourseExist = yield course_model_1.default.findById(courseId);
    if (!isCourseExist) {
        throw new AppError_1.AppError(404, 'Course not found');
    }
    const result = yield course_model_1.CourseFaculty.findByIdAndUpdate(courseId, {
        course: courseId,
        $addToSet: {
            faculties: {
                $each: payload,
            },
        },
    }, {
        upsert: true,
        new: true,
    });
    return result;
});
const removeFacultiesFromCourseIntoDB = (courseId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isCourseExist = yield course_model_1.default.findById(courseId);
    if (!isCourseExist) {
        throw new AppError_1.AppError(404, 'Course not found');
    }
    const result = yield course_model_1.CourseFaculty.findByIdAndUpdate(courseId, {
        course: courseId,
        $pull: {
            faculties: {
                $in: payload,
            },
        },
    }, {
        upsert: true,
        new: true,
    });
    return result;
});
const getFacultiesFromCourse = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const faculties = yield course_model_1.CourseFaculty.findOne({ course: courseId }).populate('faculties');
    return faculties;
});
exports.CourseServices = {
    createCourse,
    getAllCoursesFromDB,
    getCourseByIdFromDB,
    updateCourseIntoDB: exports.updateCourseIntoDB,
    deleteCourseFromDB,
    assignFacultiesWithCourseIntoDB,
    removeFacultiesFromCourseIntoDB,
    getFacultiesFromCourse,
};
