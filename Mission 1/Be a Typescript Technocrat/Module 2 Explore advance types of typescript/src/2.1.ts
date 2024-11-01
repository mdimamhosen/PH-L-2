{
  //
  // type assertion
  let anything: any;
  anything = "hello";
  let strLength = (anything as string).length;
  console.log(strLength);
  anything = 123;
  // strLength = (anything as string).length; // error
  (anything as number).toFixed(2); // no error
  console.log(strLength);

  const converValue = (value: number | string): number | string | undefined => {
    if (typeof value === "number") {
      return value.toFixed(2);
    } else if (typeof value === "string") {
      const CV = `The converted value is ${parseFloat(value)}`;
      return CV;
    }
  };

  const res1 = converValue(123) as string;
  const res2 = converValue("123") as string;
  interface CustomError extends Error {
    message: string;
  }

  try {
  } catch (error) {
    console.log((error as CustomError).message);
  }

  console.log(res1, res2);

  //
}
