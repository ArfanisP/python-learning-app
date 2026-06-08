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