import React, { useEffect, useState } from "react";
import axios from "axios";
import MyNavbar from "../component/navbar/MyNavbar";
import MyCard from "../component/MyCard";
import Loading from "../component/loading/Loading";

// Giả sử Loading là một component hoặc định nghĩa tạm thời nếu chưa có
// const Loading = () => <p>Đang tải dữ liệu...</p>;

export default function Home() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setLessons(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    if (API_URL) {
      fetchData();
    }
  }, []);

  return (
    <div>
      <MyNavbar />
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        {loading ? (
          <Loading />
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "25px",
              justifyItems: "center",
            }}
          >
            {lessons
              .filter((lesson) => lesson.isCompleted === false)
              .map((lesson) => (
                <MyCard key={lesson.id} data={lesson} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
