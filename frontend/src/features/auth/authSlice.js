import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userInfo: userInfoFromStorage,
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600)); // Simulate network delay
      
      if (email && password.length >= 6) {
        const userInfo = {
          _id: 'local_user_' + Date.now(),
          name: email.split('@')[0],
          email: email,
          isAdmin: email === 'admin@nexcart.com',
          token: 'local-mock-token-abc123'
        };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        return userInfo;
      } else {
        return rejectWithValue('Invalid email or password (password must be 6+ chars).');
      }
    } catch (error) {
      return rejectWithValue('An unexpected error occurred during login.');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600)); // Simulate network delay
      
      if (name && email && password.length >= 6) {
        const userInfo = {
          _id: 'local_user_' + Date.now(),
          name: name,
          email: email,
          isAdmin: false,
          token: 'local-mock-token-abc123'
        };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        return userInfo;
      } else {
        return rejectWithValue('Invalid registration details (password must be 6+ chars).');
      }
    } catch (error) {
      return rejectWithValue('An unexpected error occurred during registration.');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('userInfo');
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = null;
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
