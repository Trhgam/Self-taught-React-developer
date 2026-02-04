import { useState } from "react";
import "./App.css";
import Counter2 from "./component/Count2/Counter2";
import StateTimingDemo from "./component/StateTimingDemo/StateTimingDemo";
import Toggle from "./component/Toggle/Toggle";
import ModelDetail from "./component/ModelDetail/ModelDetail";
function App() {
  const [isShow, setShow] = useState(false);
  const handleShow = () => {
    setShow(!isShow);
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      {/* <Counter2 /> */}
      {/* <Toggle /> */}
      <StateTimingDemo handleShow={handleShow} isShow={isShow} />
      {isShow && <ModelDetail onClose={handleClose} />}
    </>
  );
}

export default App;
