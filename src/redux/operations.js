import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://fasteasy-jvqis72guq-lm.a.run.app/tz-front";

axios.defaults.headers.common["Authorization"] =
  "Basic cmVuZXNhbmRybzpxd2VydHkxMjM0";

export const generateImages = createAsyncThunk(
  "tasks/generate",
  async (values, thunkAPI) => {
    try {
      console.log(values);
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
  async (values, thunkAPI) => {
    try {
      const res = await axios.post("/generate_formats", values);

      console.log(res);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
