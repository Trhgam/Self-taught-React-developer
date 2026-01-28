import React, { Component } from "react";

// Hàm chuyển đổi
const toCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;
const toFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

const tryConvert = (temperature, convert) => {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) return "";
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
};

// Component con cho ô nhập liệu
class TemperatureInput extends Component {
  handleChange = (e) => {
    this.props.onTemperatureChange(e.target.value);
  };

  render() {
    const { temperature, title } = this.props;
    return (
      <fieldset>
        <legend>Nhập độ {title}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

// Component cha điều phối
class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = { temperature: "", scale: "c" };
  }

  handleCelsiusChange = (temperature) => {
    this.setState({ scale: "c", temperature });
  };

  handleFahrenheitChange = (temperature) => {
    this.setState({ scale: "f", temperature });
  };

  render() {
    const { temperature, scale } = this.state;

    // Tính toán giá trị hiển thị cho cả 2 ô
    const celsius =
      scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit =
      scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          title="Celsius"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          title="Fahrenheit"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />

        {/* Ô thông báo nước sôi */}
        <div style={{ marginTop: "20px", fontWeight: "bold", color: "red" }}>
          {parseFloat(celsius) >= 100
            ? "⚠️ Thông báo: Nước đã sôi!"
            : "Nước chưa sôi."}
        </div>
      </div>
    );
  }
}

export default Calculator;
