import "./App.css";
import Home from "./pages/Home.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route as Router } from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import AllLessonsPage from "./pages/AllLessonsPage.jsx";
import CompletedLessons from "./pages/CompletedLessons.jsx";
import LessonDetailPage from "./pages/LessonDetailPage.jsx";
import AddLessonsPage from "./pages/AddLessonsPage.jsx";
import UpdateLessonPage from "./pages/UpdateLessonPage.jsx";
function App() {
  return (
    <Routes>
      <Router path="/" element={<Home />}></Router>
      <Router path="/all-lessons" element={<AllLessonsPage />}></Router>
      <Router path="/completed-lessons" element={<CompletedLessons />}></Router>
      <Router path="/lesson-detail/:id" element={<LessonDetailPage />}></Router>
      <Router path="/add" element={<AddLessonsPage />}></Router>
      <Router path="/edit/:id" element={<UpdateLessonPage />}>
        {" "}
      </Router>
      <Router path="*" element={<NotFound />}></Router>
    </Routes>
  );
}

/**
 * 1.Khởi tạo dự án React
 * Mở Terminal tại thư mục làm bài và thực hiện:
    Tạo Project: (Thay se194670 bằng MSSV của bạn)
    npm create vite@latest se194670 -- --template react
    Cài đặt thư viện:
    cd se194670
    npm install axios react-router-dom bootstrap react-bootstrap formik yup
 * 
 * 
 */
export default App;
