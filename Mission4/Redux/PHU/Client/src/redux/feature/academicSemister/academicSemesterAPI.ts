import { baseAPI } from "../../api/baseAPI";

const academicSemesterAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getALlAcademicSemester: builder.query({
      query: () => ({
        url: "/academic-semesters",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetALlAcademicSemesterQuery } = academicSemesterAPI;
