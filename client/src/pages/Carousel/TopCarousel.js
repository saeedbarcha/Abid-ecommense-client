import React from "react";
import Sidebar from "./Sidebar";
import "./Home.css";
import SliderHome from "./SliderHome";

const TopCarousel = () => {
  return (
    <>
      <section className="mainContCarousel">
      
          <div className="sideBarCont">
            <Sidebar />
          </div>
          <div className="sliderCont">
            <SliderHome />
          </div>
      
      </section>
    </>
  );
};

export default TopCarousel;
