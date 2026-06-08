import api from "./api";

export const getMyProgress = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get(
    "/progress/my-progress",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const saveProgress = async (
  lessonId,
  score,
  completed
) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/progress",
    {
      lessonId,
      score,
      completed,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};