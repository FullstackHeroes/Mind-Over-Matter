import React from "react";
import { render } from "react-dom";
import HelpBar from "./global/HelpBar";
import zipcodes from "zipcodes";

const Doctor = () => (
  <div className="dashboardFullDiv">
    <div className="doctorHeader">
      <h1>Find A Doctor</h1>
    </div>

    <form className="doctorForm">
      <label>
        <small>Enter Your Zip Code</small>
        <input
          type="text"
          id="zipInput"
          className="form-control"
          placeholder="Zip Code"
          maxLength="5"></input>
      </label>
      <br></br>
      <button type="button" className="btn btn-dark">
        Search
      </button>
    </form>
    <br></br>

    <div className="doctorsList">
      <div class="row">
        <div class="col-4">
          <div class="list-group" id="list-tab" role="tablist">
            <a
              class="list-group-item list-group-item-action active"
              id="list-home-list"
              data-toggle="list"
              href="#list-home"
              role="tab"
              aria-controls="home">
              Doctor 1
            </a>
            <a
              class="list-group-item list-group-item-action"
              id="list-profile-list"
              data-toggle="list"
              href="#list-profile"
              role="tab"
              aria-controls="profile">
              Doctor 2
            </a>
            <a
              class="list-group-item list-group-item-action"
              id="list-messages-list"
              data-toggle="list"
              href="#list-messages"
              role="tab"
              aria-controls="messages">
              Doctor 3
            </a>
            <a
              class="list-group-item list-group-item-action"
              id="list-settings-list"
              data-toggle="list"
              href="#list-settings"
              role="tab"
              aria-controls="settings">
              Doctor 4
            </a>
          </div>
        </div>
        <div class="col-8">
          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="list-home"
              role="tabpanel"
              aria-labelledby="list-home-list">
              Doctor 1 Info
            </div>
            <div
              class="tab-pane fade"
              id="list-profile"
              role="tabpanel"
              aria-labelledby="list-profile-list">
              Doctor 2 Info
            </div>
            <div
              class="tab-pane fade"
              id="list-messages"
              role="tabpanel"
              aria-labelledby="list-messages-list">
              Doctor 3 Info
            </div>
            <div
              class="tab-pane fade"
              id="list-settings"
              role="tabpanel"
              aria-labelledby="list-settings-list">
              Doctor 4 Info
            </div>
          </div>
        </div>
      </div>
    </div>

    <div></div>
    <HelpBar />
  </div>
);

function getZipCode() {
  const zipCode = document.getElementById("zipInput").value;
}

const lookupZip = zip => {};

export default Doctor;

// THIS IS THE LINK TO HIT ZIPCODEAPI WITH OUR API KEY. NEED TO PASS IN ZIP CODE
// https://www.zipcodeapi.com/rest/ED2tcUuoAJb49nZJSqhQ3bSMJGitLzYBm1kYNNqGmTTmsozq8afTsvp8zXdbnMdq/info.json/{zip}/degrees

// THIS IS THE LINK TO HIT BETTERDOCTOR WITH OUR API KEY. NEED TO PASS IN LON/LAT COORDINATES
// https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=psychiatrist%2C%20psychologist&location={lat}%2C{lon}%2C100&user_location={lat}%2C{lon}&skip=0&limit=15&user_key=b00def43163e9bcc5fef549144df8432
