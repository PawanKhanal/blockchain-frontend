import React from "react";
import Blockchain from "./components/blockchain";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <div>
      <h1>Blockchain App</h1>
      <ErrorBoundary>
        <Blockchain />
      </ErrorBoundary>
    </div>
  );
};

export default App;
