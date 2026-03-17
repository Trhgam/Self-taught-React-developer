import React from "react";
import { Container, Row, Col, Badge, Button, Card } from "react-bootstrap";
import formatTime from "../../utils/formatTime";

export default function MyItemDetail({ data }) {
  // 

  return (
    <Container>
      <Card className="shadow-sm border-0">
        <Row className="g-0">
          <Col md={5}>
            <Card.Img
              src={data.lessonImage}
              alt={data.lessonTitle}
              style={{ objectFit: "cover", height: "100%", minHeight: "200px" }}
            />
          </Col>
          <Col md={7}>
            <Card.Body className="p-4 d-flex flex-column h-100">
              <div className="mb-3">
                <Badge bg="info" className="me-2">
                  {data.level}
                </Badge>
                <Badge bg={data.isCompleted ? "success" : "warning"}>
                  {data.isCompleted ? "Đã hoàn thành" : "Chưa hoàn thành"}
                </Badge>
              </div>

              <Card.Title as="h2" className="mb-3">
                {data.lessonTitle}
              </Card.Title>

              <Card.Text className="text-muted mb-4">
                <strong>ID bài học:</strong> {data.id} <br />
                <strong>Thời gian dự kiến:</strong>{" "}
                {formatTime(data.estimatedTime)}
              </Card.Text>

              <div className="mt-auto">
                <Button variant="primary" size="lg" className="w-100">
                  {data.isCompleted ? "Xem lại bài học" : "Bắt đầu học ngay"}
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
