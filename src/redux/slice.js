import { createSlice } from "@reduxjs/toolkit";
import { generateFormats, generateImages } from "./operations";

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const renesandroSlice = createSlice({
  name: "renesandro",
  initialState: {
    table: [],
    cards: {},
    loading: false,
    error: null,
  },

  extraReducers: (builder) =>
    builder
      .addCase(generateImages.pending, handlePending)
      .addCase(generateImages.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.table = action.payload;
      })
      .addCase(generateImages.rejected, handleRejected)
      .addCase(generateFormats.pending, handlePending)
      .addCase(generateFormats.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cards = action.payload;
      })
      .addCase(generateFormats.rejected, handleRejected),
});

export default renesandroSlice.reducer;
