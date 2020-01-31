import React from "react";
import {Link} from "react-router-dom";

const NotFound = () => (
  <div id="error-page">
    <center>
      <center>Oops! Page Not Found!</center>
      {/* <img src="/errorPage.jpg" /> will need this jpg file, commented out to prevent crashing*/}
      <center>
        <Link to="/">Return to Login Page</Link>
      </center>
    </center>
  </div>
);
export default NotFound;
