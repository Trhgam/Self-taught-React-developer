// Hàm format giây sang phút/giờ
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds );
  return `${minutes} phút`;
};
export default formatTime;
//
