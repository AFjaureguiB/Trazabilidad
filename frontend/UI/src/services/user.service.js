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
export const getUsersAdmin = async () => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;
    const response = await axios.get("/users/admins", {
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
    return error.response.data;
  }
};

export const deleteUserById = async (userId) => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;

    const URL = `/users/${userId}`;
    console.log(URL);
    const response = await axios.delete(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);
    const { status, data } = response;

    if (status === 200) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
    return {
      message: error.message,
    };
  }
};
export const deleteAdminUserById = async (userId) => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;

    const URL = `/users/admins/${userId}`;
    const response = await axios.delete(URL, {
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

export const addUser = async (newUser) => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;

    const response = await axios.post("/users", newUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { status, data } = response;
    if (status === 201) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
    return {
      message: error.message,
    };
  }
};

export const addAdminUser = async (newUser) => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;

    const response = await axios.post("/users/admins", newUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);
    const { status, data } = response;
    if (status === 201) return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const updateUser = async (user, id) => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;
    const URL = `/users/${id}`;
    const response = await axios.put(URL, user, {
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
      message: error.message,
    };
  }
};

export const updateAdminUser = async (user) => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;

    const newUser = { ...user };
    if (!newUser.plainpassword) {
      delete newUser.plainpassword;
    }

    console.log(newUser);
    const response = await axios.put("/users/admins", newUser, {
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
