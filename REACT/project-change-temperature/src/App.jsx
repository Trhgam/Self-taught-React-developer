import { Container, Row, Col, Card, Form, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
function App() {
  const [temperature, setTemperature] = useState({
    celsius: "",
    fahrenheit: "",
  });

  const handleConvert = (event, value) => {
    if (value == "") {
      setTemperature({
        celsius: "",
        fahrenheit: "",
      });
    }
    if (!isNaN(value)) {
      switch (event.target.name) {
        case "celsius":
          setTemperature({
            celsius: value,
            fahrenheit: (value * 9) / 5 + 32,
          });
          break;
        case "fahrenheit":
          setTemperature({
            celsius: ((value - 32) * 5) / 9,
            fahrenheit: value,
          });
          break;
        default:
          break;
      }
    }
  };
  return (
    <>
      {/* Card: Dùng shadow để tạo độ nổi, border-0 để bỏ viền mặc định */}
      <Card
        className="shadow-sm border-0"
        style={{ width: "100%", maxWidth: "450px", borderRadius: "15px" }}
      >
        <Card.Body className="p-4">
          <h2 className="fw-bold text-center mb-4" style={{ color: "#6fb0de" }}>
            Temperature Converter
          </h2>

          <Form>
            {/* Phần hiển thị Độ C */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold text-secondary">
                Celsius Degree
              </Form.Label>
              <InputGroup size="lg">
                <Form.Control
                  type="number"
                  placeholder="Nhập độ C..."
                  className="border-end-0 shadow-none" // shadow-none để mất viền xanh khi focus
                  style={{
                    borderRadius: "12px 0 0 12px",
                    border: "2px solid #eee",
                  }}
                  value={temperature.celsius}
                  onChange={(event) =>
                    handleConvert(event, temperature.celsius)
                  }
                />
                <InputGroup.Text
                  className="bg-white"
                  style={{
                    borderRadius: "0 12px 12px 0",
                    border: "2px solid #eee",
                    borderLeft: "none",
                    color: "#6fb0de",
                    fontWeight: "bold",
                  }}
                >
                  °C
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            {/* Divider hoặc Icon trang trí giữa 2 ô */}
            <div className="d-flex align-items-center my-3">
              <hr className="flex-grow-1" />
              <span className="mx-2 text-muted" style={{ fontSize: "1.2rem" }}>
                ⇄
              </span>
              <hr className="flex-grow-1" />
            </div>

            {/* Phần hiển thị Độ F */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold text-secondary">
                Fahrenheit Degree
              </Form.Label>
              <InputGroup size="lg">
                <Form.Control
                  type="number"
                  placeholder="Nhập độ F..."
                  className="border-end-0 shadow-none"
                  style={{
                    borderRadius: "12px 0 0 12px",
                    border: "2px solid #eee",
                  }}
                  value={temperature.fahrenheit}
                  onChange={(event) =>
                    handleConvert(event, temperature.fahrenheit)
                  }
                />
                <InputGroup.Text
                  className="bg-white"
                  style={{
                    borderRadius: "0 12px 12px 0",
                    border: "2px solid #eee",
                    borderLeft: "none",
                    color: "#e74c3c",
                    fontWeight: "bold",
                  }}
                >
                  °F
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Text className="text-muted d-block text-center mt-3">
              Giá trị sẽ tự động cập nhật khi bạn nhập liệu
            </Form.Text>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default App;
