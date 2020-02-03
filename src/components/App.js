import React from "react";
import VideoInput from "./face/VideoInput";
import Table from "./data/Table";
import logo from "../images/logo.svg";

function App() {
  return (
    <div className="appFullDiv">
      <h1>
        Mind Over Matter
        <img src={logo} className="appLogo" alt="logo" />
      </h1>
      <div className="appInsideDiv">
        <VideoInput />
        <Table />
      </div>
    </div>
  );
}

export default App;
