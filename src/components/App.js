import React from "react";
import NavBar from "./NavBar";
import Home from "./Home";
import Routes from "../routes";

function App() {
  return (
    <div className="App">
      <h1>Mind Over Matter</h1>
      <NavBar />
      <Home />
      <Routes />
    </div>
  );
}

export default App;
