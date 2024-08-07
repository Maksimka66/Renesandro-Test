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
    tasks: [],
    images: [],
    cards: {},
    addTaskValues: {},
    modal: false,
    loading: false,
    error: null,
  },

  extraReducers: (builder) =>
    builder
      .addCase(generateImages.pending, handlePending)
      .addCase(generateImages.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.images.push(action.payload);
      })
      .addCase(generateImages.rejected, handleRejected)
      .addCase(generateFormats.pending, handlePending)
      .addCase(generateFormats.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cards = action.payload;
      })
      .addCase(generateFormats.rejected, handleRejected),

  reducers: {
    switchModal(state, action) {
      state.modal = action.payload;
    },
    addTaskValues(state, action) {
      state.tasks.push(action.payload);
    },
    removeTask(state, action) {
      state.tasks = state.tasks.filter(
        (task) => task.template_id !== action.payload
      );
    },
  },
});

export const { switchModal, addTaskValues, removeTask } =
  renesandroSlice.actions;

export default renesandroSlice.reducer;
