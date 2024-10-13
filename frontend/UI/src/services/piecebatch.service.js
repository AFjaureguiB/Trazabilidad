import axios from "../services/root.service";

export const getPieceBatch = async () => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;

    const response = await axios.get("/pieces-batches", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { status, data } = response;
    if (status === 200) return data;
    if (status === 204) return [];
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

/*{
  "startdate" : "2024-10-07 00:00:00",
  "enddate" : "2024-10-12 00:00:00",
  "status": "STAND BY"
} */

export const savePieceBatch = async (payload) => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;

    const response = await axios.post("/pieces-batches", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { status, data } = response;
    if (status === 201) return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const addPiecesToPieceBatch = async (payload) => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;

    const response = await axios.post("/pieces-batches/addpieces", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { status, data } = response;
    if (status === 201) return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const updatedPieceBatch = async (payload) => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;

    const response = await axios.put("/pieces-batches", payload, {
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
