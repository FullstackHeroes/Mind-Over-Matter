import React from "react";

// IMPORTING COMPONENTS
import Routes from "./Routes";
import VideoInput from "./face/VideoInput";
import NavBar from "./global/NavBar";

function App() {
  return (
    <div className="appFullDiv">
      <NavBar />
      <div className="appInsideDiv">
        <VideoInput />
        <Routes />
      </div>
    </div>
  );
}

export default App;
