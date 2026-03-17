import React from "react";
import { Spinner } from "react-bootstrap";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="loading-container">
      <Spinner
        animation="border"
        variant="#f4c0d6"
        role="status"
        className="spinner-custom"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <h5 className="loading-text">Đang tải dữ liệu...</h5>
    </div>
  );
}
