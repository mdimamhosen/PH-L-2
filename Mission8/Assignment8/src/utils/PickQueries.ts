export const pickQueries = (obj: Record<string, unknown>, keys: string[]) => {
  const pickedObj: Record<string, unknown | number> = {};
  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      pickedObj[key] = obj[key];
    }
  }
  return pickedObj;
};
