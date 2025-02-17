import { Table, TableColumnsType, TableProps } from "antd";

import { useState } from "react";
import { TQueryParams } from "../../../types";
import { IAcademicSemesterData } from "../../../types/AcademicSemester.type";
import { useGetALlAcademicSemesterQuery } from "../../../redux/feature/academicSemister/academicSemesterAPI";

export type TTableDataAcademicSemester = Pick<
  IAcademicSemesterData,
  "_id" | "name" | "year" | "startMonth" | "endMonth"
>;

const AcademicSemester_Page = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>([]);
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetALlAcademicSemesterQuery(params);
  console.log("semesterData =>", semesterData?.data);

  const tableData = semesterData?.data?.map(
    ({ _id, name, startMonth, endMonth, year }) => {
      return {
        _id,
        name,
        year,
        startMonth,
        endMonth,
        key: _id,
      };
    }
  );
  const columns: TableColumnsType<TTableDataAcademicSemester> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Spring",
          value: "Spring",
        },
        {
          text: "Fall",
          value: "Fall",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value as string),
      width: "30%",
    },
    {
      title: "Year",
      dataIndex: "year",
      // sorter: (a, b) => a.age - b.age,
      width: "20%",
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
      filters: [
        {
          text: "January",
          value: "January",
        },
        {
          text: "February",
          value: "February",
        },
        {
          text: "March",
          value: "March",
        },
        {
          text: "April",
          value: "April",
        },
        {
          text: "May",
          value: "May",
        },
        {
          text: "June",
          value: "June",
        },
        {
          text: "July",
          value: "July",
        },
        {
          text: "August",
          value: "August",
        },
        {
          text: "September",
          value: "September",
        },
        {
          text: "October",
          value: "October",
        },
        {
          text: "November",
          value: "November",
        },
        {
          text: "December",
          value: "December",
        },
      ],
      onFilter: (value, record) =>
        record.startMonth.startsWith(value as string),
      filterSearch: true,
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
      filters: [
        {
          text: "January",
          value: "January",
        },
        {
          text: "February",
          value: "February",
        },
        {
          text: "March",
          value: "March",
        },
        {
          text: "April",
          value: "April",
        },
        {
          text: "May",
          value: "May",
        },
        {
          text: "June",
          value: "June",
        },
        {
          text: "July",
          value: "July",
        },
        {
          text: "August",
          value: "August",
        },
        {
          text: "September",
          value: "September",
        },
        {
          text: "October",
          value: "October",
        },
        {
          text: "November",
          value: "November",
        },
        {
          text: "December",
          value: "December",
        },
      ],
      onFilter: (value, record) => record.endMonth.startsWith(value as string),
      filterSearch: true,
    },
  ];

  const onChange: TableProps<TTableDataAcademicSemester>["onChange"] = (
    // _pagination,
    filters,
    // _sorter,
    extra
  ) => {
    if (extra.action && (extra.action as unknown as string) === "filter") {
      const queryParams: TQueryParams[] = [];
      extra.name?.forEach((item) => {
        queryParams.push({ name: `name`, value: String(item) });
      });
      extra.startMonth?.forEach((startMonth) => {
        queryParams.push({ name: `startMonth`, value: String(startMonth) });
      });
      extra.endMonth?.forEach((endMonth) => {
        queryParams.push({ name: `endMonth`, value: String(endMonth) });
      });
      setParams(queryParams);
    }

    // console.log(extra.action);
    console.log("filters =>", filters);
    console.log("extra =>", extra);
  };

  if (isLoading || isFetching) return <div>Loading...</div>;

  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
      />
    </div>
  );
};

export default AcademicSemester_Page;
