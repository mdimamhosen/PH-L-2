import { FieldValues, SubmitHandler } from "react-hook-form";

import { Button, Col, Flex } from "antd";

import PHForm from "../../components/Form/PHForm";
import PHFormSelect from "../../components/Form/PHFormSelect";
import {
  AcademicSemesterNameOptions,
  AcademicSemesterStartMonthOptions,
} from "../../Data/Data.AcademicSemester";
import { zodResolver } from "@hookform/resolvers/zod";

import { academicSemesterSchema } from "../../Schema/AcademicManagement.Schema";
import { useCreateAcademicSemesterMutation } from "../../redux/feature/academicSemister/academicSemesterAPI";
import { toast } from "sonner";
import { TResponse } from "../../types";

const currentYear = new Date().getFullYear();
export const YearOptions = [0, 1, 2, 3, 4].map((year) => ({
  value: String(currentYear + year),
  label: String(currentYear + year),
}));

type TSemesterData = {
  name: string;
  code: string;
  year: string;
  startMonth: string;
  endMonth: string;
};

const CreateAcademicSemester = () => {
  const [addAcadmiceSemester] = useCreateAcademicSemesterMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const name = AcademicSemesterNameOptions[parseInt(data?.name) - 1]?.label;

    const semesterdata: TSemesterData = {
      name: name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    const toastId = toast.loading("Creating academic semester...");
    try {
      const response = (await addAcadmiceSemester(semesterdata)) as TResponse;
      console.log(response);
      if (response.error) {
        toast.error(response.error?.message || response.error?.data.message, {
          id: toastId,
        });
        return;
      }
      toast.success(response.data?.message, { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error("Error in creating academic semester", { id: toastId });
    }

    console.log(semesterdata);
  };

  return (
    <Flex justify="center" align="middle" style={{ height: "100%" }}>
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHFormSelect
            label="Name"
            name="name"
            options={AcademicSemesterNameOptions}
          />
          <PHFormSelect label="Year" name="year" options={YearOptions} />
          <PHFormSelect
            label="Start Month"
            name="startMonth"
            options={AcademicSemesterStartMonthOptions}
          />

          <PHFormSelect
            label="End Month"
            name="endMonth"
            options={AcademicSemesterStartMonthOptions}
          />

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
