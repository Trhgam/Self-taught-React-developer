import { useState } from "react";
import "./App.css";
import Clock from "./components/Clock";
import BareInput from "./components/BareInput";
import LoginControl from "./components/LoginControl";

function App() {
  const [name, setName] = useState("Casio");
  const [visible, setVisible] = useState(true);
  return (
    <div className="App">
      {/* <button onClick={() => setName("Apple")}>Change name</button>
      <Clock name={name} />
      <button onClick={() => setVisible(false)}>Hide Clock component</button>
      {visible && <Clock name={name} />} */}
      {/* <BareInput type="text" value="100" autoFocus className="input-control"/> */}
      <LoginControl hidden={false} />
    </div>
  );
}

export default App;
