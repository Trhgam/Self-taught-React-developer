// Thêm interface này phía trên component
import React from "react";
import "./Button.scss";
interface ButtonProps {
  label: string;
  onClick: () => void;
  width?: string;
}

// Khai báo kiểu dữ liệu cho component
function Button({ label, onClick , width}: ButtonProps) {
  const getBtnClass = (btn: string) => {
    // Thêm kiểu string cho btn
    if (["+", "-", "×", "÷", "="].includes(btn)) return "btn-operator";
    if (["Clear", "CE"].includes(btn)) return "btn-clear";
    return "btn-number";
  };

  return (
    <button
      className={`btn ${getBtnClass(label)}`}
      onClick={onClick}
      data-label={label}
      style={{ width: width ? width : "auto" }}
    >
      {label}
    </button>
  );
}
export default Button;
