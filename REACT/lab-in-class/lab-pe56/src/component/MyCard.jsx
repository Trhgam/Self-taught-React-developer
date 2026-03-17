import { Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import formatTime from "../utils/formatTime";

// Dữ liệu mặc định khi không có props truyền vào
const defaultData = {
  lessonTitle: "Tiêu đề bài học",
  lessonImage: "https://via.placeholder.com/300x180?text=No+Image",
  level: "N/A",
  isCompleted: false,
  estimatedTime: 0,
};

export function MyCard({ data = {} }) {
  const navigate = useNavigate();
  const finalData = { ...defaultData, ...data };
  const minutes = formatTime(finalData.estimatedTime );

  return (
    <Card style={styles.card}>
      <div style={styles.imageWrapper}>
        <Card.Img
          variant="top"
          src={finalData.lessonImage}
          style={styles.image}
          onClick={() => navigate(`/lesson-detail/${finalData.id}`)}
        />
        <Badge bg="primary" style={styles.badge}>
          {finalData.level}
        </Badge>
      </div>

      <Card.Body style={styles.body}>
        <Card.Title style={styles.title}>{finalData.lessonTitle}</Card.Title>
        <Card.Text style={styles.text}>
          Thời gian: <strong>{minutes}</strong>
        </Card.Text>
        <div style={styles.footer}>
          <Button
            variant={finalData.isCompleted ? "success" : "outline-primary"}
            style={styles.button}
          >
            {finalData.isCompleted ? "Đã hoàn thành" : "Bắt đầu học"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

const styles = {
  card: {
    width: "20rem",
    borderRadius: "12px",
    border: "none",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    overflow: "hidden",
    transition: "transform 0.2s ease-in-out",
    backgroundColor: "#fff",
    margin: "15px",
  },
  imageWrapper: {
    position: "relative",
    height: "450px",
    backgroundColor: "#f8f9fa",
  },
  image: {
    objectFit: "cover",
    height: "100%",
    width: "100%",
    cursor: "pointer",
  },
  badge: {
    position: "absolute",
    top: "12px",
    right: "12px",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "0.75rem",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  body: {
    padding: "1.25rem",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#212529",
    marginBottom: "10px",
    height: "2.8rem",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  text: {
    fontSize: "0.9rem",
    color: "#6c757d",
    marginBottom: "20px",
  },
  footer: {
    marginTop: "auto",
  },
  button: {
    width: "100%",
    borderRadius: "8px",
    fontWeight: "600",
    padding: "10px",
    fontSize: "0.9rem",
  },
};

export default MyCard;
