export const pagination = (options: Record<string, unknown>) => {
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 10;
  const skip: number = (page - 1) * limit;
  const sortBy: string = (options.sortBy as string) || 'createdAt';
  const sortOrder: string = (options.sortOrder as string) || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
