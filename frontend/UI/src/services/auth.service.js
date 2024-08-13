import axios from "./root.service";
import cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export const login = async ({ username, password }) => {
  try {
    const response = await axios.post("auth/login", {
      username,
      password,
    });
    const { status, data } = response;

    if (status === 200) {
      const { username, role, process, processId } = await jwtDecode(
        data.data.accessToken
      );
      localStorage.setItem(
        "user",
        JSON.stringify({ username, role, process, processId })
      );
      localStorage.setItem("accestkn", data.data.accessToken);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.data.accessToken}`;
      return { status: response.status };
    }
  } catch (error) {
    console.log(error);
    return {
      message: error.response.data.message,
      error: error.response.data.error,
      status: error.response.status,
    };
  }
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accestkn");
  delete axios.defaults.headers.common["Authorization"];
  cookies.remove("jwt");
};

export const test = async () => {
  try {
    const response = await axios.get("/users");
    const { status, data } = response;
    if (status === 200) {
      console.log(data.data);
    }
  } catch (error) {
    console.log(error);
  }
};
