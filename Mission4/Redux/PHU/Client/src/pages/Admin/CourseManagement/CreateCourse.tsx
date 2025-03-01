import PHForm from "../../../components/Form/PHForm";
import PHFormInput from "../../../components/Form/PHFormInput";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHFormSelect from "../../../components/Form/PHFormSelect";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/feature/courseManagement/courseManagement";

const CreateCourse = () => {
  const { data: courseData } = useGetAllCoursesQuery(undefined);

  const [addCourse] = useAddCourseMutation();

  const couresOptions = courseData?.data?.map((course) => ({
    value: course._id,
    label: course.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses?.map((item) => ({
        course: item,
        isDeleted: false,
      })),
    };
    console.log(courseData);
    addCourse(courseData);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHFormInput type="text" name="title" label="Title" />
          <PHFormInput type="text" name="prefix" label="Prefix" />
          <PHFormInput type="number" name="code" label="Code" />
          <PHFormInput type="number" name="credits" label="Credits" />
          <PHFormSelect
            name="preRequisiteCourses"
            label="Pre Requisite Courses"
            options={couresOptions}
            mode="multiple"
          />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
