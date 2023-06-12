import React from "react";
import Sdata from "./Sdata";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";

const SlideCard = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots) => {
      return <ul style={{ align: "center" }}>{dots}</ul>;
    },
  };
  return (
    <>
      <Slider {...settings} >
        {Sdata.map((value, index) => {
          <div>
            
          </div>
          return (
            <>
              <div className=" d_flex "  key={index}>
                <div className="left"  style={{
                      width: "50%",
                      height: "auto",
                                    }}>
                  <h1>{value.title}</h1>
                  <p>{value.desc}</p>
                  <button
                    className=" moreBtnSlider"
                    style={{ backgroundColor: "#e98337" }}
                  >
                    More About
                  </button>
                </div>
                <div className="right"  style={{
                      width: "50%",
                      height: "auto",
                      borderRadius: "15px",
                    }}>
                  <img
                    src={value.cover}
                    alt=""
                    style={{
                      width: "80%",
                      height: "auto",
                      borderRadius: "15px",
                    }}
                  />
                </div>
              </div>
            </>
          );
        })}
      </Slider>
    </>
  );
};

export default SlideCard;
