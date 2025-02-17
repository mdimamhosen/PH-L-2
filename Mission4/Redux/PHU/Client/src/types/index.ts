import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { ReactNode } from "react";

export type TSideBarItem = {
  key: string;
  label: ReactNode;
  children?: TSideBarItem[];
};

export interface IUserPath {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: IUserPath[];
}

export interface IErrorData {
  success: boolean;
  message?: string;
  statusCode?: number;
  stack?: string;
  err?: {
    statusCode?: number;
  };
}

export interface IResponseData {
  success: boolean;
  message?: string;
  statusCode?: number;
  stack?: string;
  err?: {
    statusCode?: number;
  };
}

export type TError = {
  data: {
    success?: boolean;
    message?: string;
    stack?: string;
  };
  status?: number;
  message?: string;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  success?: boolean;
  message?: string;
  meta?: TMeta;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParams = {
  name?: string;
  value?: boolean | React.Key | string;
};

export type TResponseCreateSemester = TResponse<{
  message: string;
  data: {
    _id: string;
    name: string;
    year: string;
    startMonth: string;
    endMonth: string;
  };
}>;
