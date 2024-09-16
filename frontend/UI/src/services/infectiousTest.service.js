import axios from "../services/root.service";

export const updateInfectiousTest = async (payload) => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;

    let { testId, ...testData } = payload;

    if (testData.comment === "") {
      const { comment, ...rest } = testData;
      testData = rest;
    }

    const URL = `/infectious/${testId}`;

    const response = await axios.put(URL, testData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { status, data } = response;
    if (status === 200) {
      return data;
    }
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
