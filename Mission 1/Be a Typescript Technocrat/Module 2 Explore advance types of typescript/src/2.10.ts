{
  //
  //   Mapped type

  const numbersArray: number[] = [1, 2, 3, 4, 5];
  //   const stringArray: string[] = ["1", "2", "3", "4", "5"];
  // also can be written using map
  const stringArray: string[] = numbersArray.map(String);
  console.log(stringArray);
  //   OR
  const stringArray2: string[] = numbersArray.map((NUMBER) => String(NUMBER));
  console.log(stringArray2);
  //   OR
  const stringArray3: string[] = numbersArray.map((NUMBER) =>
    NUMBER.toString()
  );
  console.log(stringArray3);

  //   --------------------------------------------

  type AreaInNumber = {
    height: number;
    width: number;
  };

  // type AreaInString = {
  //     height: string;
  //     width: string;
  // }
  // also can be written using map
  type AreaInString = {
    [key in keyof AreaInNumber]: string;
  };

  //   lookup types

  type Height = AreaInNumber["height"];
  type Width = AreaInNumber["width"];
  //   This is called lookup types

  //   Generic in Mapped type

  type AreaInString2<T> = {
    [key in keyof T]: T[key];
  };

  const area1: AreaInString2<{ height: string; width: number }> = {
    height: "10",
    width: 20,
  };
  console.log(area1); // { height: '10', width: 20 }

  //
}
