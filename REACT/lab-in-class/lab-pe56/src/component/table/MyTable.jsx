import React from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import sortLessonsByIdDesc from "../../utils/sortLessonsByIdDesc";
import Loading from "../loading/Loading";

const TableHeader = () => (
  <thead>
    <tr>
      <th>Image</th>
      <th>Lesson Title</th>
      <th>Level</th>
    </tr>
  </thead>
);

export default function MyTable({ lessons, isLoading }) {
  const navigate = useNavigate();


  if (isLoading || !lessons) {
    return <Loading />;
  }

  const completedLessons = lessons.filter(
    (lesson) => lesson.isCompleted === true,
  );

  const sortedLessons = sortLessonsByIdDesc(completedLessons);

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
            <td>
              <img
                src={lesson.lessonImage}
                alt={lesson.lessonTitle}
                style={{
                  width: "90px",
                  height: "auto",
                  borderRadius: "4px",
                }}
              />
            </td>
            <td>{lesson.lessonTitle}</td>
            <td>{lesson.level}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
