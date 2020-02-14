import React, { Component } from "react";
import HelpBar from "./global/HelpBar";
import zipcodes from "zipcodes";
import axios from "axios";
import secrets from "../../secrets";

class Doctor extends Component {
  constructor() {
    super();
    this.state = {
      zipcode: "",
      doctorList: []
    };
    this.handleZipCode = this.handleZipCode.bind(this);
    this.getZipCode = this.getZipCode.bind(this);
    this.getDoctors = this.getDoctors.bind(this);
    this.enterPressed = this.enterPressed.bind(this);
  }

  handleZipCode = evt => {
    evt.preventDefault();
    if (!isNaN(evt.target.value)) {
      this.setState({ [evt.target.name]: evt.target.value });
    }
  };

  async getZipCode() {
    const zipCode = this.state.zipcode;

    var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);

    if (!isValidZip) {
      window.alert("Not A Valid Zip Code", zipCode);
    } else {
      const lonlat = await zipcodes.lookup(zipCode);
      if (!lonlat) {
        this.setState({ zipcode: "" });
        return alert("Please enter a valid zipcode");
      }
      const lat = lonlat.latitude;
      const lon = lonlat.longitude;
      this.getDoctors(lat, lon);
    }
  }

  getDoctors = async (lat, lon) => {
    const res = await axios.get(
      `https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=psychiatrist%2C%20psychologist&location=${lat}%2C${lon}%2C100&user_location=${lat}%2C${lon}&skip=0&limit=10&user_key=${betterDoctorAPIKey}`
    );
    const doctorArr = [];

    for (let i = 0; i < res.data.data.length; i++) {
      const doctorObj = {},
        phone = res.data.data[i].practices[0].phones[0].number;
      doctorObj.id = i;
      doctorObj.firstName = res.data.data[i].profile.first_name;
      doctorObj.lastName = res.data.data[i].profile.last_name;
      doctorObj.street = res.data.data[i].practices[0].visit_address.street;
      doctorObj.city = res.data.data[i].practices[0].visit_address.city;
      doctorObj.state = res.data.data[i].practices[0].visit_address.state;
      doctorObj.zip = res.data.data[i].practices[0].visit_address.zip;
      doctorObj.phone = `(${phone.slice(0, 3)}) ${phone.slice(
        3,
        6
      )}-${phone.slice(6)}`;
      doctorArr.push(doctorObj);
    }
    this.setState({ doctorList: doctorArr, zipcode: "" });
  };

  enterPressed(event) {
    var code = event.keyCode || event.which;

    if (code === 13) {
      // 13 IS ENTER BUTTON
      event.preventDefault();
      this.getZipCode();
    }
  }
  render() {
    return (
      <div className="dashboardFullDiv">
        <h1 className="doctorHeader">Find A Doctor</h1>

        <form className="doctorForm">
          <label className="doctorLabel">
            <small className="doctorLabelText">Enter Zip Code:</small>

            <input
              type="text"
              id="zipInput"
              className="doctorInput"
              name="zipcode"
              value={this.state.zipcode}
              onChange={this.handleZipCode}
              onKeyPress={this.enterPressed}
              maxLength="5"
              placeholder="Zip Code"
              onFocus={e => (e.target.placeholder = "")}
              onBlur={e => (e.target.placeholder = "Zip Code")}
            />

            <button
              id="zipSubmit"
              type="button"
              className="btn btn-dark"
              onClick={this.getZipCode}>
              Search
            </button>
          </label>
        </form>

        <br></br>

        <div className="doctorList">
          <table className="tableElement">
            <thead>
              <tr className="doctorTableHeader">
                <th className="doctorTableHeaderRow">Name</th>
                <th className="doctorTableHeaderRow">Street</th>
                <th className="doctorTableHeaderRow">City</th>
                <th className="doctorTableHeaderRow">State</th>
                <th className="doctorTableHeaderRow">Zip</th>
                <th className="doctorTableHeaderRow">Phone Number</th>
              </tr>
            </thead>
          </table>

          {this.state.doctorList.map(doctor => (
            <table className="doctorTable" key={doctor.id}>
              <tbody>
                <tr>
                  <td className="doctorTableDataRow">
                    {doctor.firstName} {doctor.lastName}
                  </td>
                  <td className="doctorTableDataRow">{doctor.street}</td>
                  <td className="doctorTableDataRow">{doctor.city}</td>
                  <td className="doctorTableDataRow">{doctor.state}</td>
                  <td className="doctorTableDataRow">{doctor.zip}</td>
                  <td className="doctorTableDataRow">{doctor.phone}</td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>

        <HelpBar />
      </div>
    );
  }
}

export default Doctor;
