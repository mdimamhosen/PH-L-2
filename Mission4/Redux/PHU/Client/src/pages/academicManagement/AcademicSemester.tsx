import { useGetALlAcademicSemesterQuery } from "../../redux/feature/academicSemister/academicSemesterAPI";

const AcademicSemester_Page = () => {
  const { data } = useGetALlAcademicSemesterQuery(undefined);

  console.log("data =>", data);
  return <div></div>;
};

export default AcademicSemester_Page;
