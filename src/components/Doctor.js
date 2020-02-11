import React from "react";
import { render } from "react-dom";
import HelpBar from "./global/HelpBar";

const Doctor = () => (
  <div className="dashboardFullDiv">
    <div className="doctorHeader">
      <h1>Find A Doctor</h1>
    </div>

    <form className="doctorForm">
      <label>
        <small>Enter Your Zip Code: </small>
        <input
          type="text"
          class="form-control"
          placeholder="Zip Code"
          maxLength="5"></input>
      </label>
      <br></br>
      <input className="btn btn-dark" type="search" value="Search"></input>
    </form>

    <div className="doctorsList"></div>

    <div></div>
    <HelpBar />
  </div>
);

export default Doctor;
