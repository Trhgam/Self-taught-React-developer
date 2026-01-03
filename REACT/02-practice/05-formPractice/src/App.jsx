import "./App.css";
import Button from "./component/button/Button";

import Interface from "./component/interfacecalc/Interface";
const btnLabels = [
  "7",
  "8",
  "9",
  "÷",
  "4",
  "5",
  "6",
  "×",
  "1",
  "2",
  "3",
  "-",
  "0",
  ".",
  "=",
  "+",
];
function App() {
  const handleButtonClick = (label) => {
    console.log("Nút được bấm:", label);
  };
  return (
    <div>
      <div className="interface-ui">
        <Interface />
        <div className="doubleC">
          <Button
            label="Clear"
            data-label="Clear"
            onClick={() => handleButtonClick("C")}
            width="200px"
          />
          <Button
            label="CE"
            data-label="CE"
            onClick={() => handleButtonClick("CE")}
            width="200px"
          />
        </div>
        <div className="keypad">
          {btnLabels.map((label) => (
            <Button
              key={label}
              label={label}
              data-label={label}
              onClick={() => handleButtonClick(label)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
