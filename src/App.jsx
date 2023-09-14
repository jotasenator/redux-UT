// App.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "./redux/slices/dataSlice";
import {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
} from "./redux/slices/counterSlice";

function App() {
  const dispatch = useDispatch();

  // Fetching data
  const data = useSelector((state) => state.data.items);
  const dataStatus = useSelector((state) => state.data.status);

  useEffect(() => {
    if (dataStatus === "idle") {
      dispatch(fetchData());
    }
  }, [dataStatus, dispatch]);

  // Counter
  const count = useSelector((state) => state.counter.value);

  return (
    <div>
      <h1>Counter</h1>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(4))}>
        Increment 4
      </button>
      <button onClick={() => dispatch(decrementByAmount(5))}>
        Decrement 5
      </button>

      <h1>Data</h1>
      {dataStatus === "loading" && <div>Loading...</div>}
      {dataStatus === "succeeded"
        ? data.map((item) => <div key={item.id}>{item.title}</div>)
        : ""}
      {dataStatus === "failed" ? <div>Error al cargar los datos.</div> : ""}
      <br />
    </div>
  );
}

export default App;
