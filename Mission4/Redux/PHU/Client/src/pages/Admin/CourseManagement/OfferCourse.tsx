import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/Form/PHForm";
import PHFormSelectWithWatch from "../../../components/Form/PHFormSelectWithWatch";
import { useGetAcademicFacultiesQuery } from "../../../redux/feature/academicSemister/academicSemesterAPI";
import PHFormInput from "../../../components/Form/PHFormInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";

const OfferCourse = () => {
  const [id, setId] = useState("");

  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);
  const academicSemesterOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHFormSelectWithWatch
            onValueChange={setId}
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <PHFormInput type="text" name="Test" label="Test" disable={!id} />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
