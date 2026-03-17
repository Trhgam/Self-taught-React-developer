import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MyNavbar from "../component/navbar/MyNavbar";
import MyItemDetail from "../component/myitemdetail/MyItemDetail";
import Loading from "../component/loading/Loading";

export default function LessonDetailPage() {
  const { id } = useParams(); // Lấy id từ URL
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = `${import.meta.env.VITE_API_URL}/${id}`;

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(API_URL);
        setLesson(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết bài học:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, API_URL]);

  return (
    <div>
      <MyNavbar />
      <div style={{ marginTop: "40px" }}>
        {loading ? (
          <Loading />
        ) : lesson ? (
          <MyItemDetail data={lesson} />
        ) : (
          <p className="text-center">Không tìm thấy bài học.</p>
        )}
      </div>
    </div>
  );
}
