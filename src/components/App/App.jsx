import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../Loader/Loader";

import "./App.css";

const Tasks = lazy(() => import("../../pages/Tasks/Tasks"));
const Cards = lazy(() => import("../../pages/Cards/Cards"));
const NotFound = lazy(() => import("../../pages/NotFound/NotFound"));

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Tasks />}>
            <Route path=":taskId" element={<Cards />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
