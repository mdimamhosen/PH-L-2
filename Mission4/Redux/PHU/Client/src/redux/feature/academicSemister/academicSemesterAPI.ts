import { TResponseRedux } from "../../../types";
import { IAcademicSemesterData } from "../../../types/AcademicSemester.type";
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
  }),
});

export const {
  useGetALlAcademicSemesterQuery,
  useCreateAcademicSemesterMutation,
} = academicSemesterAPI;
