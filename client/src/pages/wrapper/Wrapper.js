import React from "react";
import "./style.css";
import { MdLocalShipping, MdSafetyDivider } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { VscWorkspaceTrusted } from "react-icons/vsc";

const iconStyle = {
  width: "50px",
  height: "50px",
  color: "#096DDF",
};

const Wrapper = () => {
  const data = [
    {
      cover: <MdLocalShipping style={iconStyle} />,
      title: "Worldwide Delivery",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
      cover: <MdSafetyDivider style={iconStyle} />,
      title: "Safe Payment",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
      cover: <VscWorkspaceTrusted style={iconStyle} />,
      title: "Shop With Confidence ",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
      cover: <BiSupport style={iconStyle} />,
      title: "24/7 Support ",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
  ];
  return (
    <>
      <section className="wrapper background">
        <div className="container grid2">
          <div  className="row">
            {data.map((val, index) => {
              return (
                <div className="col"  key={index}>
                  <div className="product ">
                    <div className="img icon-circle">
                      <i>{val.cover}</i>
                    </div>
                    <h3>{val.title}</h3>
                    <p>{val.decs}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Wrapper;
