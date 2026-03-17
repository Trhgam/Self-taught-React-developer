const sortLessonsByIdDesc = (data) => {
  if (!data) return [];
  return [...data].sort((a, b) => Number(b.id) - Number(a.id));
};

export default sortLessonsByIdDesc;
