import React from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import MyNavbar from "../component/navbar/MyNavbar";

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
  estimatedTime: Yup.number()
    .positive("Thời gian phải là số dương")
    .required("Vui lòng nhập thời gian"),
  level: Yup.string().required("Vui lòng chọn cấp độ"),
});

export default function AddLessonsPage() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const initialValues = {
    lessonTitle: "",
    lessonImage: "",
    estimatedTime: "",
    level: "",
    isCompleted: false,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post(API_URL, values);
      alert("Thêm bài học thành công!");
      navigate("/");
    } catch (error) {
      alert("Lỗi khi thêm bài học.");
      console.log(error);
      
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-light min-vh-100">
      <MyNavbar />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="border-0 shadow-sm rounded-3">
              <Card.Body className="p-4">
                {/* Header căn trái */}
                <div className="text-start mb-4">
                  <h2 className="fw-bold " style={{ color: "#6fb0de" }}>Add New Lesson</h2>
                  <p className="text-muted small">
                    Create engaging content for your students
                  </p>
                </div>

                <Formik
                  initialValues={initialValues}
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
                          placeholder="e.g., Master Kanji in 30 Days"
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
                        variant="primary"
                        type="submit"
                        className="w-100 fw-bold py-2"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Adding..." : "Create Lesson"}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
