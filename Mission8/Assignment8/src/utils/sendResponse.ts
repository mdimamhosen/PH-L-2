import { Response } from 'express';

const sendResponse = <T>(
  res: Response,
  data: {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T | undefined | null;
    meta?: {
      page?: number;
      limit?: number;
      total?: number;
      totalPages?: number;
    };
    error?: string;
    errorMessage?: string;
    errorName?: string;
    errorStack?: string;
    errorCode?: string;
    errorStatusCode?: number;
    errorData?: T;
  },
) => {
  return res.status(data.statusCode).json({
    messsage: data.message,
    success: data.success,
    data: data.data,
    statusCode: data.statusCode,
    meta: data.meta,
    error: data.error,
    errorMessage: data.errorMessage,
    errorName: data.errorName,
    errorStack: data.errorStack,
    errorCode: data.errorCode,
    errorStatusCode: data.errorStatusCode,
    errorData: data.errorData,
  });
};

export default sendResponse;
