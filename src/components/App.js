import React from "react";

// IMPORTING COMPONENTS
import VideoInput from "./face/VideoInput";
import Table from "./data/Table";
import NavBar from "./global/NavBar";

function App() {
  return (
    <div className="appFullDiv">
      <NavBar />
      <div className="appInsideDiv">
        <VideoInput />
        <Table />
      </div>
    </div>
  );
}

export default App;
