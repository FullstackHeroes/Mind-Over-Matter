import React from "react";
import { render } from "react-dom";
import HelpBar from "./global/HelpBar";
import zipcodes from "zipcodes";
import axios from "axios";

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
      <button
        type="button"
        className="btn btn-dark"
        onClick={() => getZipCode()}>
        Search
      </button>
    </form>
    <br></br>

    <div className="doctorsList">
      <div className="row">
        <div className="col-4">
          <div className="list-group" id="list-tab" role="tablist">
            <a
              className="list-group-item list-group-item-action active"
              id="list-home-list"
              data-toggle="list"
              href="#list-home"
              role="tab"
              aria-controls="home">
              Doctor 1
            </a>
            <a
              className="list-group-item list-group-item-action"
              id="list-profile-list"
              data-toggle="list"
              href="#list-profile"
              role="tab"
              aria-controls="profile">
              Doctor 2
            </a>
            <a
              className="list-group-item list-group-item-action"
              id="list-messages-list"
              data-toggle="list"
              href="#list-messages"
              role="tab"
              aria-controls="messages">
              Doctor 3
            </a>
            <a
              className="list-group-item list-group-item-action"
              id="list-settings-list"
              data-toggle="list"
              href="#list-settings"
              role="tab"
              aria-controls="settings">
              Doctor 4
            </a>
          </div>
        </div>
        <div className="col-8">
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="list-home"
              role="tabpanel"
              aria-labelledby="list-home-list">
              Doctor 1 Info
            </div>
            <div
              className="tab-pane fade"
              id="list-profile"
              role="tabpanel"
              aria-labelledby="list-profile-list">
              Doctor 2 Info
            </div>
            <div
              className="tab-pane fade"
              id="list-messages"
              role="tabpanel"
              aria-labelledby="list-messages-list">
              Doctor 3 Info
            </div>
            <div
              className="tab-pane fade"
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
  console.log(zipCode);
  if (isNaN(zipCode) || zipCode === "") {
    console.error("isNaN: ", isNaN(zipCode));
    window.alert("Not A Valid Zip Code: ", zipCode);
  } else {
    const lonlat = zipcodes.lookup(zipCode);
    const lat = lonlat.latitude;
    const lon = lonlat.longitude;
    console.log(lat);
    console.log(lon);
    getDoctors(lat, lon);
  }
}

async function getDoctors(lat, lon) {
  const { data } = await axios.get(
    `https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=psychiatrist%2C%20psychologist&location=${lat}%2C${lon}%2C100&user_location=${lat}%2C${lon}&skip=0&limit=10&user_key=b00def43163e9bcc5fef549144df8432`
  );
  console.log(data);
  console.log("Doctor 1: ", data.data[0]);
  console.log("First Name: ", data.data[0].profile.first_name);
  console.log("Last Name: ", data.data[0].profile.last_name);
  console.log("Street: ", data.data[0].practices[0].visit_address.street);
  console.log("City: ", data.data[0].practices[0].visit_address.city);
  console.log("State: ", data.data[0].practices[0].visit_address.state);
  console.log("Zip: ", data.data[0].practices[0].visit_address.zip);
  console.log("Phone: ", data.data[0].practices[0].phones[0].number);
}

export default Doctor;

// THIS IS THE LINK TO HIT BETTERDOCTOR WITH OUR API KEY. NEED TO PASS IN LON/LAT COORDINATES
// https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=psychiatrist%2C%20psychologist&location={lat}%2C{lon}%2C100&user_location={lat}%2C{lon}&skip=0&limit=15&user_key=b00def43163e9bcc5fef549144df8432
