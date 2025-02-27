import { TResponseRedux } from "../../../types";
import {
  IAcademicDepartmentData,
  IAcademicSemesterData,
} from "../../../types/AcademicSemester.type";
import { baseAPI } from "../../api/baseAPI";

const academicSemesterAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getALlAcademicSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            params.append(key, value as string);
          });
        }

        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (
        response: TResponseRedux<IAcademicSemesterData[]>
      ) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    createAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),

    getAllAcademicDepartment: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            params.append(key, value as string);
          });
        }
        return {
          url: "/academic-departments",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (
        response: TResponseRedux<IAcademicDepartmentData[]>
      ) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const {
  useGetALlAcademicSemesterQuery,
  useCreateAcademicSemesterMutation,
  useGetAllAcademicDepartmentQuery,
} = academicSemesterAPI;
