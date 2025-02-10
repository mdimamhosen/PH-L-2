import { Link, Outlet } from "react-router-dom";
import "./App.css";
import { ModeToggle } from "./components/mode/mode-toggle";

function App() {
  return (
    <>
      <div
        className="
     flex justify-end w-11/12 mx-auto my-4"
      >
        <ModeToggle />
      </div>
      <div className="flex justify-between w-11/12 border  mx-auto my-4">
        <ul>
          <li>
            <Link to="/">Task</Link>
          </li>
          <li>
            <Link to="users">Users</Link>
          </li>
        </ul>
        <Outlet />
      </div>{" "}
    </>
  );
}

export default App;
