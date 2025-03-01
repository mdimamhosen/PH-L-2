import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Flex } from "antd";

import { toast } from "sonner";
import { TResponse } from "../../../types";
import { useAddRegisteredSemesterMutation } from "../../../redux/feature/courseManagement/courseManagement";
import PHForm from "../../../components/Form/PHForm";
import PHFormSelect from "../../../components/Form/PHFormSelect";
import PHDatePicker from "../../../components/Form/PHDatePicker";
import PHFormInput from "../../../components/Form/PHFormInput";
import { semesterStatusOptions } from "../../../Data/Global.Data";
import { useGetALlAcademicSemesterQuery } from "../../../redux/feature/academicSemister/academicSemesterAPI";

const SemesterRegistration = () => {
  const [addSemester] = useAddRegisteredSemesterMutation();
  const { data: academicSemester } = useGetALlAcademicSemesterQuery([
    { name: "sort", value: "year" },
  ]);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    console.log(semesterData);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = (await addSemester(semesterData)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created", { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHFormSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />

          <PHFormSelect
            name="status"
            label="Status"
            options={semesterStatusOptions}
          />
          <PHDatePicker name="startDate" label="Start Date" />
          <PHDatePicker name="endDate" label="End Date" />
          <PHFormInput type="text" name="minCredit" label="Min Credit" />
          <PHFormInput type="text" name="maxCredit" label="Max Credit" />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
