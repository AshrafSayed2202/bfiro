import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const res = await fetch(`${baseUrl}actions/users/me.php`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Not authenticated");
  }

  const data = await res.json();
  return data.user;
});

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const res = await fetch(`${baseUrl}actions/users/login.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await res.json();
    return data.message;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await fetch(`${baseUrl}actions/users/logout.php`, {
    method: "POST",
    credentials: "include",
  });
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failed";
        state.user = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
      });
  },
});

export default authSlice.reducer;
