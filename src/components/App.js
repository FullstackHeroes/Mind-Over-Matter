import React from "react";
import VideoInput from "./face/VideoInput";
import logo from "../images/logo.svg";

function App() {
  return (
    <div className="appFullDiv">
      <h1>
        Mind Over Matter
        <img src={logo} className="appLogo" alt="logo" />
      </h1>
      <VideoInput />
    </div>
  );
}

export default App;
