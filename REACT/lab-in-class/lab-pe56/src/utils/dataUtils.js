/**
 * Sắp xếp mảng đối tượng theo chuỗi (Tăng dần)
 * @param {Array} data - Mảng cần sắp xếp
 * @param {string} key - Trường dữ liệu để so sánh
 */
export const sortByStringInc = (data, key) => {
  if (!data || !Array.isArray(data)) return [];
  return [...data].sort((a, b) => (a[key] || "").localeCompare(b[key] || ""));
};

/**
 * Sắp xếp mảng đối tượng theo chuỗi (Giảm dần)
 * @param {Array} data - Mảng cần sắp xếp
 * @param {string} key - Trường dữ liệu để so sánh
 */
export const sortByStringDesc = (data, key) => {
  if (!data || !Array.isArray(data)) return [];
  return [...data].sort((a, b) => (b[key] || "").localeCompare(a[key] || ""));
};

/**
 * Sắp xếp mảng đối tượng theo ngày tháng (Tăng dần)
 * @param {Array} data - Mảng cần sắp xếp
 * @param {string} key - Trường dữ liệu để so sánh
 */
export const sortByDayInc = (data, key) => {
  if (!data || !Array.isArray(data)) return [];
  return [...data].sort((a, b) => new Date(a[key]) - new Date(b[key]));
};

/**
 * Sắp xếp mảng đối tượng theo ngày tháng (Giảm dần)
 * @param {Array} data - Mảng cần sắp xếp
 * @param {string} key - Trường dữ liệu để so sánh
 */
export const sortByDayDesc = (data, key) => {
  if (!data || !Array.isArray(data)) return [];
  return [...data].sort((a, b) => new Date(b[key]) - new Date(a[key]));
};

/**
 * Hàm format dữ liệu linh hoạt (Ngày tháng, Tiền tệ, Số)
 * @param {any} value - Giá trị cần format
 * @param {string} type - Loại format ('date' | 'currency' | 'number')
 */
export const formatData = (value, type) => {
  if (value === null || value === undefined) return "";

  switch (type) {
    case "date": {
      const d = new Date(value);
      // Kiểm tra nếu ngày tháng không hợp lệ thì trả về giá trị gốc
      if (isNaN(d.getTime())) return value;

      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0"); // Tháng trong JS tính từ 0
      const year = d.getFullYear();

      return `${day}-${month}-${year}`; // Trả về định dạng DD-MM-YYYY
    }
    case "currency": //3 Đ
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    case "number": //1.234.334
      return new Intl.NumberFormat("vi-VN").format(value);
    default:
      return value;
  }
};

/**
 * --- CÁCH DÙNG (USAGE) ---
 *
 * 1. Import hàm:
 * import { sortByStringInc, sortByDayDesc, formatData } from '../utils/dataUtils';
 *
 * 2. Sort theo tên (Tăng dần):
 * const sortedList = sortByStringInc(lessons, 'lessonTitle');
 *
 * 3. Sort theo ngày (Giảm dần):
 * const latestList = sortByDayDesc(posts, 'createdAt');
 *
 * 4. Format ngày tháng:
 * const dateStr = formatData('2024-03-17', 'date'); // Output: 17/03/2024
 *
 * 5. Format tiền tệ:
 * const price = formatData(1500000, 'currency'); // Output: 1.500.000 ₫
 */
