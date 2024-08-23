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
    if (status === 201) return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const addTissueToDonor = async (donorId, tissueData) => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;

    const URL = `/donors/${donorId}/tissues`;
    const response = await axios.post(URL, tissueData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    const { status, data } = response;

    if (status === 201) return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const updateDonor = async (donor) => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;

    const { id, ...donorData } = donor;

    const URL = `/donors/${id}`;

    const response = await axios.put(URL, donorData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { status, data } = response;
    if (status === 200) return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
