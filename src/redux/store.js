import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import renesandroReducer from "./slice";

const tasksPersistConfig = {
  key: "renesandroSlice",
  storage,
  whitelist: ["tasks"],
};

const persistedTasksReducer = persistReducer(
  tasksPersistConfig,
  renesandroReducer
);

export const store = configureStore({
  reducer: {
    renesandro: persistedTasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
