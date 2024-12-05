{
  //
  //   Never type, Unknown Type, Nullable Type

  const searchName = (value: string | null) => {
    if (value) {
      console.log("Searching for " + value);
    } else {
      console.log("Please provide a value");
    }
  };

  searchName("John Doe");
  searchName("");
  searchName(null);

  const getSpeedPerMeterPerSecond = (value: unknown) => {
    if (typeof value === "number") {
      const convertedSpeed = ((value as number) * 1000) / 3600;
      return convertedSpeed;
    }
    if (typeof value === "string") {
      const [speed, unit] = value.split(" ");
      if (unit === "km/h") {
        const convertedSpeed = (parseInt(speed) * 1000) / 3600;
        return convertedSpeed;
      } else {
        return "Invalid unit";
      }
    }
  };

  console.log(getSpeedPerMeterPerSecond(100));

  console.log(getSpeedPerMeterPerSecond("102 km/h"));

  //   Never type
  const throwError = (message: string): never => {
    throw new Error(message);
  };

  throwError("This is an error");
}
