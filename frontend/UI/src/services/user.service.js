import axios from "../services/root.service";

export const getUsers = async () => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;
    const response = await axios.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { status, data } = response;

    if (status === 200) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
    return {
      message: error.response.data.message,
      error: error.response.data.error,
    };
  }
};
