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

// THIS IS THE LINK TO HIT ZIPCODEAPI WITH OUR API KEY. NEED TO PASS IN ZIP CODE
// https://www.zipcodeapi.com/rest/ED2tcUuoAJb49nZJSqhQ3bSMJGitLzYBm1kYNNqGmTTmsozq8afTsvp8zXdbnMdq/info.json/{zip}/degrees

// THIS IS THE LINK TO HIT BETTERDOCTOR WITH OUR API KEY. NEED TO PASS IN LON/LAT COORDINATES
// https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=psychiatrist%2C%20psychologist&location={lat}%2C{lon}%2C100&user_location={lat}%2C{lon}&skip=0&limit=15&user_key=b00def43163e9bcc5fef549144df8432
