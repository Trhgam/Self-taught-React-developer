import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import MyNavbar from "../component/navbar/MyNavbar";
// --- MARK: Fixed MyModal import (named import & correct filename) ---
import { MyModal } from "../component/notification/MyModal";

const validationSchema = Yup.object().shape({
  lessonTitle: Yup.string()
    .required("Vui lòng nhập tiêu đề bài học")
    .test(
      "is-more-than-one-word",
      "Tiêu đề phải có nhiều hơn 1 từ",
      (val) => val && val.trim().split(/\s+/).length > 1,
    ),
  lessonImage: Yup.string()
    .url("URL ảnh không hợp lệ")
    .required("Vui lòng nhập URL ảnh"),
  estimatedTime: Yup.number().positive("Phải là số dương").required("Bắt buộc"),
  level: Yup.string().required("Vui lòng chọn cấp độ"),
});

export default function UpdateLessonPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- 1. Quản lý trạng thái Modal ---
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setInitialData(response.data);
      } catch (error) {
        console.error("Error:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [id, API_URL, navigate]);

  // --- 2. Xử lý khi nhấn Submit ---
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.put(`${API_URL}/${id}`, values);
      // Thay vì alert, ta bật Modal lên
      setShowModal(true);
    } catch (error) {
      console.log(error);
      alert("Đã có lỗi xảy ra!");
    } finally {
      setSubmitting(false);
    }
  };

  // Hàm xử lý khi nhấn "Xác nhận" trên Modal
  const handleModalConfirm = () => {
    setShowModal(false);
    navigate("/"); // Chuyển trang sau khi user đã đọc thông báo và bấm xác nhận
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      <MyNavbar />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="border-0 shadow-sm rounded-3">
              <Card.Body className="p-4">
                <div className="text-start mb-4">
                  <h2 className="fw-bold text-success">Update Lesson</h2>
                  <p className="text-muted small">ID: {id}</p>
                </div>

                <Formik
                  initialValues={initialData}
                  enableReinitialize={true}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors,
                    touched,
                    isSubmitting,
                  }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <Form.Group className="mb-3 text-start">
                        <Form.Label className="fw-bold">
                          Lesson Title
                        </Form.Label>
                        <Form.Control
                          name="lessonTitle"
                          value={values.lessonTitle}
                          onChange={handleChange}
                          isInvalid={
                            touched.lessonTitle && !!errors.lessonTitle
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.lessonTitle}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3 text-start">
                        <Form.Label className="fw-bold">
                          Lesson Image URL
                        </Form.Label>
                        <Form.Control
                          name="lessonImage"
                          value={values.lessonImage}
                          onChange={handleChange}
                          isInvalid={
                            touched.lessonImage && !!errors.lessonImage
                          }
                          placeholder="https://example.com/image.jpg"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.lessonImage}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Row>
                        <Col sm={6}>
                          <Form.Group className="mb-3 text-start">
                            <Form.Label className="fw-bold">
                              Time (min)
                            </Form.Label>
                            <Form.Control
                              type="number"
                              name="estimatedTime"
                              value={values.estimatedTime}
                              onChange={handleChange}
                              isInvalid={
                                touched.estimatedTime && !!errors.estimatedTime
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.estimatedTime}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col sm={6}>
                          <Form.Group className="mb-3 text-start">
                            <Form.Label className="fw-bold">Level</Form.Label>
                            <Form.Select
                              name="level"
                              value={values.level}
                              onChange={handleChange}
                              isInvalid={touched.level && !!errors.level}
                            >
                              <option value="">Select Level</option>
                              {["N1", "N2", "N3", "N4", "N5"].map((lvl) => (
                                <option key={lvl} value={lvl}>
                                  {lvl}
                                </option>
                              ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.level}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-4 d-flex align-items-center bg-light p-3 rounded border">
                        <Form.Check
                          type="switch"
                          id="isCompleted"
                          name="isCompleted"
                          checked={values.isCompleted}
                          onChange={handleChange}
                        />
                        <Form.Label
                          htmlFor="isCompleted"
                          className="mb-0 ms-2 fw-bold"
                        >
                          Mark as Completed
                        </Form.Label>
                      </Form.Group>

                      <Button
                        variant="success"
                        type="submit"
                        className="w-100 fw-bold py-2 shadow-sm"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Updating..." : "Save Changes"}
                      </Button>

                      <Button
                        variant="link"
                        className="w-100 mt-2 text-secondary decoration-none"
                        onClick={() => navigate("/")}
                      >
                        Cancel
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* --- 3. Chèn MyModal vào cuối component --- */}
      <MyModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleModalConfirm}
        title="Thành công"
        message="Thông tin bài học đã được cập nhật thành công!"
        variant="success"
      />
    </div>
  );
}
