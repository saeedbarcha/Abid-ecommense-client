import React from "react";
import "./style.css";
import { FaGooglePlay } from "react-icons/fa";
import { BsFillPlayFill } from "react-icons/bs";

const Footer = () => {
  const googlePlayStyle = {
    width: "40px",
    height: "40px",
  };
  const playStyle = {
    width: "40px",
    height: "40px",
  };
  return (
    <>
      <div className="footerCont">
        <footer>
          <div className="container-fluid grid2">
            <div className="row">
              <div className="col-12 text-center">
                <h1 style={{ color: "#e98337" }}>LUBICK</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Auctor libero id et, in gravida. Sit diam duis mauris nulla
                  cursus. Erat et lectus vel ut sollicitudin elit at amet.
                </p>

                <div className="icon d_flex">
                  <div className="img d_flex">
                    <FaGooglePlay style={googlePlayStyle} />
                    <span>Google Play</span>
                  </div>
                  <div className="img d_flex">
                    <BsFillPlayFill style={playStyle} />
                    <span>App Store</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row footerRow">
            <div className="col-sm-3 text-center">
              <h2>About Us</h2>
              <ul className="footerUl">
                <li>Careers</li>
                <li>Our Stores</li>
                <li>Our Cares</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>

            <div className="col-sm-3 text-center">
              <h2>Customer Care</h2>
              <ul className="footerUl">
                <li>Help Center </li>
                <li>How to Buy </li>
                <li>Track Your Order </li>
                <li>Corporate & Bulk Purchasing </li>
                <li>Returns & Refunds </li>
              </ul>
            </div>

            <div className="col-sm-3 text-center">
              <h2>Contact Us</h2>
              <ul className="footerUl">
                <li>
                  example example example example example , United States{" "}
                </li>
                <li>Email: example@gmail.com</li>
                <li>Phone: +1 3333 333 333</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
