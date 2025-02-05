import "./App.css";
import { decrement, increment } from "./redux/features/counter/counterSlice";
import { RootState } from "./redux/store/store";
import { useAppDispatch, useAppSelector } from "./redux/Hooks/hook";
import { useState } from "react";

function App() {
  const dispatch = useAppDispatch();
  const { value } = useAppSelector((state: RootState) => state.counter);
  const [incrementValue, setIncrementValue] = useState(0);
  const [decrementValue, setDecrementValue] = useState(0);

  const handleIncrement = () => {
    dispatch(increment(incrementValue));
  };

  const handleDecrement = () => {
    dispatch(decrement(decrementValue));
  };

  return (
    <>
      <h1>Counter With Redux</h1>
      <div>
        <input
          type="number"
          value={incrementValue}
          onChange={(e) => setIncrementValue(Number(e.target.value))}
        />
        <button onClick={handleIncrement}>Increment</button>
      </div>
      <span>{value}</span>
      <div>
        <input
          type="number"
          value={decrementValue}
          onChange={(e) => setDecrementValue(Number(e.target.value))}
        />
        <button onClick={handleDecrement}>Decrement</button>
      </div>
    </>
  );
}

export default App;
