import React from "react";
import { render } from "react-dom";

const Doctor = () => (
  <div className="dashboardFullDiv">
    <div align="center">
      <h1>Find A Doctor</h1>
      <br></br>
    </div>

    <form align="center">
      Enter Your Zip Code: <br></br>
      <input type="text" maxLength="5"></input>
      <br></br>
      <input type="submit" value="Search"></input>
    </form>

    <div></div>
  </div>
);

export default Doctor;
