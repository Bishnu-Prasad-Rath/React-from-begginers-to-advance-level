import React from "react";
import TypingTest from "./TypingTest";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#121212",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowX: "hidden",
        padding: "20px",
      }}
    >
      <div style={{ maxWidth: "800px", width: "100%" }}>
        <TypingTest duration={60} />
      </div>
    </div>
  );
}

export default App;
