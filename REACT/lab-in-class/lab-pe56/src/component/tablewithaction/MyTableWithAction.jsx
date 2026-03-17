import React from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import sortLessonsByIdDesc from "../../utils/sortLessonsByIdDesc";
import Loading from "../loading/Loading";
import formatTime from "../../utils/formatTime";
import axios from "axios";

const TableHeader = () => (
  <thead>
    <tr>
      <th>Lesson Title</th>
      <th>Level</th>
      <th>Estimated Time</th>
      <th>Actions</th>
    </tr>
  </thead>
);

export default function MyTableWithAction({ lessons, isLoading }) {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  if (isLoading || !lessons) {
    return <Loading />;
  }

  const sortedLessons = sortLessonsByIdDesc(lessons);

  const handleEdit = (e, id) => {
    e.stopPropagation(); // để làm gì thế
    console.log("Edit lesson", id);
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("Bạn có chắc chắn muốn xóa bài học này?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert("Xóa bài học thành công!");
        window.location.reload(); // sao phải reload, còn cách nào tự reoald mỗi table mà ko reload cả page ko
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
        alert("Có lỗi xảy ra khi xóa.");
      }
    }
  };

  return (
    <Table striped bordered hover responsive>
      <TableHeader />
      <tbody>
        {sortedLessons.map((lesson) => (
          <tr
            key={lesson.id}
            onClick={() => navigate(`/lesson-detail/${lesson.id}`)}
            style={{ cursor: "pointer" }}
          >
            <td>{lesson.lessonTitle}</td>
            <td>{lesson.level}</td>
            <td>{formatTime(lesson.estimatedTime)}</td>
            <td>
              <Button
                variant="warning"
                size="sm"
                className="me-2"
                onClick={(e) => handleEdit(e, lesson.id)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={(e) => handleDelete(e, lesson.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
