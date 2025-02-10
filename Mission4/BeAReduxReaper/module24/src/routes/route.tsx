import App from "@/App";
import Task from "@/pages/Task";
import User from "@/pages/User"; // Import the User page
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Task />,
      },
      {
        path: "users", // Define the user route
        element: <User />,
      },
    ],
  },
]);

export default routes;
