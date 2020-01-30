import React from "react";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import Routes from "../routes";

function App() {
  return (
    <div className="App">
      <h1>Mind Over Matter</h1>
      <NavBar />
      {/* <Dashboard /> */}
      <Routes />
    </div>
  );
}

export default App;
