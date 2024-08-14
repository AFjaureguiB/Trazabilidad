import axios from "../services/root.service";

export const getDonors = async () => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;
    const response = await axios.get("/donors", {
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
      errorMessage: error.response.data.message,
      errorDetails: error.response.data.details,
    };
  }
};

export const createDonorWithTissue = async (donorData) => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;

    const response = await axios.post("/donors", donorData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    const { status, data } = response;

    if (status === 201) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
    return {
      errorMessage: error.response.data.message,
      errorDetails: error.response.data.details,
    };
  }
};
