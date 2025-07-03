import React from "react";
import { AppRouter } from "./routes/AppRouter";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <div className="font-sans">
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </div>
  );
}

export default App;
