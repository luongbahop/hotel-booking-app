import React, { Suspense } from "react";
import { AppRouter } from "./components/AppRouter";
import Loading from "./components/Loading/Loading";

function App() {
  return (
    <Suspense
      fallback={
        <div className="loading-app">
          <Loading />{" "}
        </div>
      }
    >
      <AppRouter />
    </Suspense>
  );
}

export default App;
