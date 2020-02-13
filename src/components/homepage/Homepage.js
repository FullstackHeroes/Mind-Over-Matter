import React from "react";
import Carousel from "./Carousel";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Homepage = () => (
  <div className="homePageFullDiv">
    <Carousel />

    <div className="homepageWhite">
      <div className="hpWhiteOne hpWhiteText">
        <h3 className="hpWhiteHeader">What Is Mind Over Matter?</h3>
        <p className="hpWhiteP">
          Mind Over Matter is a mental health analytics program that analyzes
          your emotional state and mental wellbeing as you progress through your
          day. We record this data and provide feedback to help you improve your
          health.
        </p>
      </div>

      <div className="hpWhiteTwo hpWhiteText">
        <h3 className="hpWhiteHeader">Why Use Mind Over Matter?</h3>
        <p className="hpWhiteP">
          Mental health is almost always overlooked and not taken seriously. We
          want to change that. Our purpose is to help those in need and make
          people more aware of their wellbeing.
        </p>
      </div>
    </div>

    <div className="bookTextFullDiv">
      <img
        className="bookImage"
        src="https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=375&w=630"></img>

      <div className="homepageDark">
        <h3 className="hpDarkHeader">How Can We Help?</h3>

        <p className="hpDarkP">
          We provide more than just feedback. We present our data findings in
          digestible pieces such as tables, graphs, and charts. We supply
          educational articles and readings to enable you to take better care of
          yourself. And if the worst does come, we make finding a health
          professional near you easy. We're with you all the way in your journey
          to better overall health.
        </p>

        <p className="hpDarkEnd">
          Here at Mind Over Matter, we take care of you without you even
          knowing.
        </p>
      </div>
    </div>

    <div className="footer">
      <h3 className="footerTitle">
        Join the mental health revolution! <Link to="/SignIn">Sign up</Link>{" "}
        today!
      </h3>

      <div className="footerBottom">
        <h6 className="footerSum">
          Mind Over Matter - A Mental Health Improvement Platform
        </h6>

        <h6 className="footerNames">
          By Emmanuel Kanadilas, James Shen, Kenneth Chen and Robert Costello
        </h6>
      </div>
    </div>
  </div>
);

export default Homepage;
