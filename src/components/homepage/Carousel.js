import React from "react";

export default () => (
  <div className="carouselFullDiv">
    <div id="reviews" className="container-fluid">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel">
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="img-fluid"
              src="https://www.designerstencils.com/Assets/ProductImages/3781.jpg"
              alt="Mind Over Matter"></img>
            <div className="carousel-caption d-md-block"></div>
          </div>
          <div className="carousel-item">
            <img
              className="img-fluid"
              src="https://lh3.googleusercontent.com/QpdcMe560Mx5OpEXKNGg8QEgkJmeIe3CKyg1h77Fu_zM9T0UxHbmx71MhEhV7WMS9Q7H7FchPmJ--jcUYOuBBq6TvoLi0INsGJiA-a_izRzEqNW92Ho7FTjhh69w6uReOofYzMi38Sr9GkqlvnvxMXCPvW0gc_9Uj1XUPX78nQW8I7-hpBf6mMMY74e4AWXKzj2L0FPGU0IiyTD2hwobkplM2Hb0G3MnD0URYDwdMyvkDxg158dokjj_4ulGUzYDm95zqYHt3CpLvnqSSwOqpGXuc4MlQzbF1DSMGEGaIkq_T9iEEW_fk10UC8HUa1BTM06q6LlgYvuOfR-ydObEd9WX0xNA0_pr9tzJUp20SmZMgcC4GpDOnhXQ4kAEwayVRGbck8r4zlrTDdwYoqUG8ynPntisOtaZ1mp6OZGOi8qKn5rXI92isZ5xjy7Y1ojsLL5xBw2vCJ453guVA_3_K4ndKL4LZly-b3AufwoZa1o3eHjEuj_f1mJ6fz89a9Tx71AG9eFBEn0pl2AD16zc-7UxvCBHoyPec2xaM5aA-j3tQRkKmj4wDYExihkL0jIQCphRc1uHbXNVBHSpVKCBjIEWKPk-1JF99aNpJgHA8RzplqfPTpX9QU39e_y_lQB-PmJadOXbmd-mIbQMNiRxZuaMuTMGtr-d6VsI2ndVR4jV9cQbODOSYQVE_d3bvIZ6zujlVWqjZtO8qkDVdip3H9Li6PW12eV-RKFnfInxlDnxBbP4=w1919-h946-no"
              alt="Mind Over Matter"></img>
            <div className="carousel-caption d-md-block"></div>
          </div>
          <div className="carousel-item">
            <img
              className="img-fluid"
              src="https://lh3.googleusercontent.com/aXp4UUYmxenwa_M7jZa6b7-WflQuT8g8nYkbw6kzvtDF7oWnaULikVOlR69FvsxteKRYBW46NzmfpTJa5tQ3p2yZyUpp5_A21n_xeYgJGNCLm9c2YcsjX1aqQVmPAKtjLtZ6e3RLq0HNGd6AfdTFRZaJtAh-B38zFGVT9PvntOghOOQtiYAj9VuYBf7sYxOjsQ5A0q71qtiSdEePtPcMCRHDDeNIOfMv0n7l4wt25L8Gk3h3cTdlqYV3_FpWq9U_MAcjJ7nvchSjDYFUb3--Z09ii5rCGhfC2ybjmDcXLQ4eNNzjDpetVOZBZ-o-yToGZNMvBhet9I2MiWv50ckB0Hp7Lgr4_H4yfPyEUlDi4zsGOaL67GMyARf8eGkIB7ZX0j2Y0lj3k39jaI85wZz15x60fMdH73pPIWFgi3CMTHiyli_gWYEB4F8kwd0BCVEw0AuH4mZffdM-jaWu_NVKf4YIvzGQrcKIKvCv5fidvYpDK5lNH5rzzQMOnfffGnJ1oNxiOvozmvgv05aYCW2Ao5TpHjW4IqZpE1s5coziGuNZfDJewGR5qkKycceC78YzlfBrrCYJqQYkMBYAMrg3P6iT_C3yzmbL8pt3LyzyEIzIfBFlaNn6S_G9nsV3JpVBItof5eRtzGTV-tx0uUy1r-k1Ix2KG29Y_u7DuqzWQ01RkntBlKu9aha2wjK_CrGqS27AAXc-ah54IokXhWKf03eHrWwaM-drZI135EUh_dFFFAYL=w1919-h946-no"
              alt="Mind Over Matter"></img>
            <div className="carousel-caption d-md-block"></div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev">
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next">
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  </div>
);
