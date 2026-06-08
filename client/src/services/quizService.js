import api from "./api";

export const getQuizByLesson = async (
  lessonId
) => {
  const response = await api.get(
    `/quizzes/${lessonId}`
  );

  return response.data;
};