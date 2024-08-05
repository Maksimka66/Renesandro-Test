import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://fasteasy-jvqis72guq-lm.a.run.app/tz-front";

export const generateImages = createAsyncThunk(
  "tasks/generate",
  async (values, thunkAPI) => {
    try {
      const res = await axios.post("/generate_images", values);

      console.log(res);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const generateFormats = createAsyncThunk(
  "images/generate",
  async (_, thunkAPI) => {
    try {
      const res = await axios.post("/generate_formats");

      console.log(res);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
