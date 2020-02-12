import React, { Component } from "react";
import { render } from "react-dom";
import HelpBar from "./global/HelpBar";
import zipcodes from "zipcodes";
import axios from "axios";

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
  }

  handleZipCode = evt => {
    evt.preventDefault();
    this.setState({ [evt.target.name]: parseInt(evt.target.value) });
  };

  getZipCode = async () => {
    const zipCode = this.state.zipcode;
    console.log("entered zip code is : ", zipCode);
    var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);
    console.log(isValidZip);
    if (!isValidZip) {
      window.alert("Not A Valid Zip Code", zipCode);
    } else {
      const lonlat = await zipcodes.lookup(zipCode);
      console.log("lonlat: ", lonlat);
      const lat = lonlat.latitude;
      const lon = lonlat.longitude;
      console.log(lat);
      console.log(lon);
      this.getDoctors(lat, lon);
    }
  };

  getDoctors = async (lat, lon) => {
    const res = await axios.get(
      `https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=psychiatrist%2C%20psychologist&location=${lat}%2C${lon}%2C100&user_location=${lat}%2C${lon}&skip=0&limit=10&user_key=b00def43163e9bcc5fef549144df8432`
    );
    console.log(res);
    const doctorArr = [];

    for (let i = 0; i < res.data.data.length; i++) {
      const doctorObj = {};
      doctorObj.firstName = res.data.data[i].profile.first_name;
      doctorObj.lastName = res.data.data[i].profile.last_name;
      doctorObj.street = res.data.data[i].practices[0].visit_address.street;
      doctorObj.city = res.data.data[i].practices[0].visit_address.city;
      doctorObj.state = res.data.data[i].practices[0].visit_address.state;
      doctorObj.zip = res.data.data[i].practices[0].visit_address.zip;
      doctorObj.phone = res.data.data[i].practices[0].phones[0].number;
      doctorArr.push(doctorObj);
    }
    // console.log(doctorArr);
    this.setState({ doctorList: doctorArr, zipcode: "" });
  };

  render() {
    console.log("RENDER --", this.state.doctorList);
    return (
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
              name="zipcode"
              // value={this.state.zipcode}
              onChange={this.handleZipCode}
              maxLength="5"></input>
          </label>
          <br></br>
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => this.getZipCode()}>
            Search
          </button>
        </form>

        <br></br>

        <div className="doctorList">
          <table className="tableElement">
            <thead>
              <tr className="tableHeader">
                <th className="tableHeaderRow">Name</th>
                <th className="tableHeaderRow">Street</th>
                <th className="tableHeaderRow">City</th>
                <th className="tableHeaderRow">State</th>
                <th className="tableHeaderRow">Zip</th>
                <th className="tableHeaderRow">Phone Number</th>
              </tr>
            </thead>
          </table>
          {this.state.doctorList.map(doctor => {
            console.log("INSIDE -", doctor);
            return (
              <table className="doctorTable">
                <tbody>
                  <tr>
                    <td className="tableDataRow">
                      {doctor.firstName} {doctor.lastName}
                    </td>
                    <td className="tableDataRow">{doctor.street}</td>
                    <td className="tableDataRow">{doctor.city}</td>
                    <td className="tableDataRow">{doctor.state}</td>
                    <td className="tableDataRow">{doctor.zip}</td>
                    <td className="tableDataRow">{doctor.phone}</td>
                  </tr>
                </tbody>
              </table>
            );
          })}
        </div>
        <div></div>
        <HelpBar />
      </div>
    );
  }
}

export default Doctor;
