import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";

// Configure axios defaults
axios.defaults.withCredentials = true;

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    isAuthenticated: false,
    error: null,
    message: null,
    isUpdated: false,
  },
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      localStorage.setItem("token", action.payload.token);
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },

    loadUserRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      localStorage.setItem("token", action.payload.token);
    },
    loadUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },

    logoutSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = action.payload;
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = action.payload;
    },

    updatePasswordRequest(state, action) {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    updatePasswordFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.message = null;
      state.error = action.payload;
    },

    updateProfileRequest(state, action) {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    updateProfileFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.message = null;
      state.error = action.payload;
    },

    updateProfileResetAfterUpdate(state, action) {
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },

    clearAllError(state, action) {
      state.error = null;
      state.user = state.user;
    },
  },
});

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    console.log("request for login");
    dispatch(userSlice.actions.loginRequest());
    try {
      console.log("try to login");
      const { data } = await axios.post(
        `${config.apiBaseUrl}/user/login`,
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Login API Response:", data);
      if (data?.user) {
        dispatch(userSlice.actions.loginSuccess(data.user));
      } else {
        throw new Error("Invalid response from server");
      }
      dispatch(userSlice.actions.clearAllError());
    } catch (error) {
      console.error("Login Error:", error?.response?.data?.message || error);
      dispatch(
        userSlice.actions.loginFailed(
          error?.response?.data?.message || "login failed"
        )
      );
    }
  };

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.loadUserRequest());
  console.log("request for login");
  try {
    console.log("try to getuser");
    const { data } = await axios.get(`${config.apiBaseUrl}/user/me`, {
      withCredentials: true,
    });
    console.log("get user API Response:", data);
    if (data?.user) {
      dispatch(userSlice.actions.loadUserSuccess(data.user));
    } else {
      throw new Error("Invalid response from server");
    }
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    console.error("getuser Error:", error?.response?.data?.message || error);
    dispatch(
      userSlice.actions.loadUserFailed(
        error?.response?.data?.message || "getuser failed"
      )
    );
  }
};

export const logout = () => async (dispatch) => {
  try {
    console.log("try to logout");
    const { data } = await axios.get(
      `${config.apiBaseUrl}/user/logout`,
      {
        withCredentials: true,
      }
    );
    console.log("logout API Response:", data);
    // if (data?.user) {
    dispatch(userSlice.actions.logoutSuccess(data.message));
    // } else {
    //   throw new Error("Invalid response from server");
    // }
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    console.error("Logout Error:", error?.response?.data?.message || error);
    dispatch(
      userSlice.actions.logoutFailed(
        error?.response?.data?.message || "logout failed"
      )
    );
  }
};

export const updatePassword =
  (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
    dispatch(userSlice.actions.updatePasswordRequest());
    try {
      const { data } = await axios.put(
        "http://localhost:4000/api/v1/user/update/password",
        {
          currentPassword,
          newPassword,
          confirmNewPassword,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(userSlice.actions.updatePasswordSuccess(data.message));
      dispatch(userSlice.actions.clearAllError());
    } catch (error) {
      dispatch(
        userSlice.actions.updatePasswordFailed(error.response.data.message)
      );
    }
  };

export const updateProfile = (newData) => async (dispatch) => {
  dispatch(userSlice.actions.updateProfileRequest());
  try {
    const { data } = await axios.put(
      "http://localhost:4000/api/v1/user/update/me",
      newData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(userSlice.actions.updateProfileSuccess(data.message));
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      userSlice.actions.updateProfileFailed(error.response.data.message)
    );
  }
};

export const resetProfile = () => (dispatch) => {
  dispatch(userSlice.actions.updateProfileResetAfterUpdate());
};

export const clearAllUserError = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllError());
};
export default userSlice.reducer;
