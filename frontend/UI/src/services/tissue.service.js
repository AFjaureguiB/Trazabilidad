import axios from "../services/root.service";

export const updateTissue = async (tissueId, tissueData) => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;

    const URL = `/tissues/${tissueId}`;

    const response = await axios.put(URL, tissueData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    const { status, data } = response;
    if (status === 200) return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const getTissuesWithPieces = async () => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;

    const URL = "/tissues?status=accepted";

    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { status, data } = response;
    if (status === 200 || status === 204) return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
