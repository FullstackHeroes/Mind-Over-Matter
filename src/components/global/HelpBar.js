import React from "react";

export default () => (
  <div>
    <div id="helpBar" className="sidebar">
      <a
        className="closebtn"
        onClick={() => (document.getElementById("helpBar").style.width = "0%")}>
        x
      </a>
      <h3 align="center" text-color="white">
        <strong>Hi There, Welcome To The Help Section</strong>
      </h3>
      <br></br>
      <h6 text-color="white">
        This is where you can find more information about the confusing numbers
        on your screen!
      </h6>
      <br></br>
      <h6 text-color="white">Still have questions? Message us!</h6>
      <br></br>
      <form>
        <h6>Email</h6>
        <input
          type="text"
          placeholder="Enter Your Email"
          name="email"
          required></input>
        <br></br>
        <h6>My Question is: </h6>
        <textarea rows="7" cols="75"></textarea>
        <br></br>
        <button type="submit" class="submit">
          Submit Question
        </button>
      </form>
    </div>

    <input
      className="helpButton"
      onClick={() => (document.getElementById("helpBar").style.width = "25%")}
      type="image"
      src="https://learn.fullstackacademy.com/public/images/live-support-icon.svg"
      alt="Help Button"></input>
  </div>
);
