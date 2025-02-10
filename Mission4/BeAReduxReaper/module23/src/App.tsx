import { Outlet } from "react-router-dom";
import "./App.css";
import { ModeToggle } from "./components/mode/mode-toggle";

function App() {
  return (
    <>
      <div className="flex justify-between w-11/12 mx-auto my-4">
        <Outlet />

        <ModeToggle />
      </div>
    </>
  );
}

export default App;
