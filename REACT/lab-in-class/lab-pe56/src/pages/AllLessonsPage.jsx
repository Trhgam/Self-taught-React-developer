import React, { useEffect, useState } from "react";
import axios from "axios";
import MyNavbar from "../component/navbar/MyNavbar";
import MyTableWithAction from "../component/tablewithaction/MyTableWithAction";
import Loading from "../component/loading/Loading";

export default function AllPages() {
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
      <div className="container mt-4">
        <h2>All Lessons</h2>
        <MyTableWithAction lessons={lessons} isLoading={loading} />
      </div>
    </div>
  );
}
