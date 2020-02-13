import React from "react";

export default () => (
  <div>
    <div id="helpBar" className="sidebar">
      <a
        className="closebtn"
        onClick={() => (document.getElementById("helpBar").style.width = "0%")}>
        x
      </a>
      <h3 className="sidebarHeader">
        <strong>Hi There, Welcome To The Help Section</strong>
      </h3>
      <br></br>
      <h6 className="sidebarText">
        <strong>How Does Mind Over Matter Work?</strong>
        <br></br>
        <br></br>
        Mind-Over-Matter is a mental health analytics program that tracks and
        visualizes the user’s state based on a sentiment algorithm. The
        resulting score would trigger certain alerts to assist the user’s
        management of his / her mental health.
        <br></br>
        <br></br>
        <strong>What Emotional States Does Mind Over Matter Read?</strong>
        <br></br>
        <br></br>
        The emotional states are as follows: <br></br>
        Happy, Surprised, Neutral, Disgusted, Fearful, Angry and Sad. A higher
        rating means a happier reading whereas a lower rating means a sadder
        reading.
        <br></br>
        <br></br>
        <strong>What Does Normalized Score Mean?</strong>
        <br></br>
        <br></br>
        Normalized Score is your overall state of emotion by adjusting your
        emotional values measured on different scales to a notionally common
        scale. It is the aggregate of your weighted and true scores compressed.
        <br></br>
        <br></br>
        <strong>What Is The 'True Score'?</strong>
        <br></br>
        <br></br>
        True Score is the actual reading of your emotional state. Latest True
        Score is your current emotional reading score and Running True Score is
        the weighted average of your true scores.
      </h6>
      <br></br>

      <h6 className="sidebarHeader">Still have questions? Message us!</h6>
      <form className="sidebarText">
        <div className="form-group">
          <label>
            <small>Email Alllddress</small>
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            required></input>
        </div>
        <label>
          <small>Enter Your Question Below </small>
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="7"></textarea>
        <input className="btn btn-primary" type="submit" value="Submit"></input>
      </form>
    </div>

    <input
      className="helpButton"
      onClick={() => (document.getElementById("helpBar").style.width = "30%")}
      type="image"
      src="https://lh3.googleusercontent.com/lO2CC1-HwkFdcpneJpKNE157nav04tqlJi2ZyQC6Ae_RXy5eBxn0Gltw-JmipU5G2pxLV2Rl_HXg0argC633GfEZLMTDSucuH_vHRAZ0j6qhhk7tTEM1CTYTh8y4RFSde_rZG4f47U94iJVGSEdSStvf7K6KxM9zzoqcRCu-bjV7MGDY5ZH2p1em-6Lqots5D0UXasOqccn8kDSYuyaDhUvtukLRnGDaeLgMtQVhjQsXHlbRMmbJeBDnNv5huZRHbIdyI4hvzphfISpIeqiphZVLmtiOZKUeaXQ_bhlJ2atQVBrgGBgyLdsq4t23j07CSdg9dmLfF6jpWdx8p5COIXP6EUKzhxKq0L12F8ULn3atiDhaMPZyntwz5Po95tXrwsU8K_uSHmgSE7T0RWPYQgfKevp0XFJCAez2UbrJba-w8eaKX2hCoGAqG3_GAiOsRjbx_iMeBgmxN19CykHRc_9GFzTIFBgUaFt2Ls8h7payh0zIt5dlo7wffXWWKKExJtwzMlTD9zycFgW3G5Ks5-Eyglx7KvYoyjRIrnTb08aDaPznJJSKZohaZ6DmvCuZj59PFEUgJ9fzKa6TTqEeGFpOA_pmwpBlOmdA9FYk_7AH2ectw-naTnj_fXV5K_RfRvJUQVoemgP-_gLM2rhfbfhYdyfNdTHu0DLFcvt93CLV33eYMNPfLkZYsKtA09ufhMUN-gvD-BrMAaXY4i44aDCMkjFa8_TNAxKoRUB0u2hYVFq1=s80-no"
      alt="Help Button"></input>
  </div>
);
