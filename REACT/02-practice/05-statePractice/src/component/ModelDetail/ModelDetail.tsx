import React from "react";
import "./ModelDetail.css";

export default function ModelDetail(props: any) {
  const { onClose , isClos } = props;
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h5>Đây là thông tin detail nè bà ơi</h5>
        <p>Nội dung chi tiết của popup ở đây.</p>
      </div>
    </div>
  );
}
