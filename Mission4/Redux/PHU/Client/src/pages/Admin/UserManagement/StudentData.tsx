import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";

import { useState } from "react";
import { TQueryParams } from "../../../types";
import { useGetALlStudentsQuery } from "../../../redux/feature/userManagement/userManagement.api";
import { TStudent } from "../../../redux/feature/userManagement/userManagementSlice";

export type TTableDataStudent = Pick<
  TStudent,
  "_id" | "fullName" | "id" | "email" | "contactNo"
>;

export interface IMetaData {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

const StudentData = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState<number>(1);
  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetALlStudentsQuery([
    { name: "limit", value: 2 },
    { name: "page", value: page },
    {
      name: "sort",
      value: "id",
    },
    ...params,
  ]);
  console.log("semesterData =>", studentData?.data);

  const tableData = studentData?.data?.map(
    ({ _id, id, fullName, email, contactNo }) => {
      return {
        _id,
        id,
        fullName,
        key: _id,
        email,
        contactNo,
      };
    }
  );
  const metaData = studentData?.meta as IMetaData;
  console.log("metaData =>", metaData);

  //
  const columns: TableColumnsType<TTableDataStudent> = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      width: "10%",
    },

    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "10%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "10%",
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
      key: "contactNo",
      width: "10%",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: () => {
        return (
          <Space size="middle">
            <Button>Edit</Button>
            <Button>Delete</Button>
            <Button>View</Button>
            <Button>Block</Button>
          </Space>
        );
      },
    },
  ];

  const onChange: TableProps<TTableDataStudent>["onChange"] = (
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
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        total={metaData.total}
        pageSize={metaData.limit}
      />
    </>
  );
};

export default StudentData;
