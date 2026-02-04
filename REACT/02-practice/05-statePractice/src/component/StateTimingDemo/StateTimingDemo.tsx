import React, { useState, useEffect } from "react";
import ModelDetail from "../ModelDetail/ModelDetail";

const StateTimingDemo = (props : any) => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);

    // 2. Log này sẽ in ra giá trị HIỆN TẠI (giá trị cũ)
    // vì biến 'count' trong scope của hàm này chưa thay đổi
    console.log("Log tại handleClick (old):", count);
  };

  //  React sẽ thực hiện code bên trong này SAU KHI component đã render lại với state mới
  useEffect(() => {
    console.log("Log tại useEffect (updated):", count);
  }, [count]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Count: {count}</h2>
      <button onClick={handleClick}>Tăng Count</button>
      <button onClick={props.handleShow}>{props.isShow ? "Ẩn thông tin" : "Hiện thông tin"}</button> 
    </div>
  );
};

export default StateTimingDemo;
