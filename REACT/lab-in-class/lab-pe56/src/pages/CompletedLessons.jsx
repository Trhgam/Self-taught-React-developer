import React from "react";
import MyNavbar from "../component/navbar/MyNavbar";
// import MyTable from '../component/table/MyTable'
import axios from "axios";
import { useEffect, useState } from "react";
import MyTable from "../component/table/MyTable";

const API_URL = import.meta.env.VITE_API_URL;

export default function CompletedLessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
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
      <MyTable lessons={lessons} isLoading={loading}/>
    </div>
  );
}
