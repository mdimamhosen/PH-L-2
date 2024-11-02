{
  //
  interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }

  const getTodo = async (): Promise<Todo> => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    const data = await response.json();
    console.log(data);
    return data;
  };
  getTodo();

  type Something = { someThing: string }; // type alias
  //   Asynchronous TypeScript with async/await
  const createPromise = (): Promise<Something> => {
    return new Promise<Something>((resolve, reject) => {
      const data: Something = { someThing: "Some data" };
      if (data) {
        resolve(data);
      } else {
        reject("No data");
      }
    });
  };

  //   call the function

  const showData = async (): Promise<Something | void> => {
    try {
      const data = await createPromise();
      console.log("Data:", data);
      return data;
    } catch (error: unknown) {
      console.log("Error: ", error);
    }
  };
  showData();
  //
}
