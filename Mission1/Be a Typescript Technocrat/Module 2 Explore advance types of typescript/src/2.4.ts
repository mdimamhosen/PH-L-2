{
  //

  // Generics Inference
  interface Developer<T, T2 = null> {
    name: string;
    computer: {
      OS: string;
      ram: number;
    };
    smartWatch: T;
    bike?: T2;
  }

  interface Bike {
    brand: string;
    model: string;
    engine: string;
    madeBy: string;
  }

  const richDeveloper: Developer<
    {
      brand: string;
      model: string;
      display: string;
    },
    Bike
  > = {
    name: "Rich Dev",
    computer: {
      OS: "Windows",
      ram: 16,
    },
    smartWatch: {
      brand: "Apple",
      model: "Series 6",
      display: "OLED",
    },
    bike: {
      brand: "Honda",
      model: "CBR",
      engine: "250cc",
      madeBy: "Japan",
    },
  };
  type poorDeveloperWatch = {
    brand: string;
    model: string;
    display: string;
    made: string;
  };
  const poorDeveloper: Developer<poorDeveloperWatch, Bike> = {
    name: "Poor Dev",
    computer: {
      OS: "Apple",
      ram: 16,
    },
    smartWatch: {
      brand: "Huawei",
      model: "GT 2",
      display: "AMOLED",
      made: "China",
    },
  };
  console.log(richDeveloper, poorDeveloper);
  //
}
