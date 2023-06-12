import React from "react";
import Ndata from "./Ndata";

const Cart = () => {
  return (
    <>
      <div className="row">
        {Ndata.map((val, index) => {
          return (
            <div className="col box">
              <div className="newArrivalsPro" style={{display:"flex"}} key={index}>
                <div className="img">
                  <img
                    src={val.cover}
                    style={{ borderRadius: "15px" }}
                    alt="NewArrivals pic"
                    className="newArrivalsImg"
                  />
                </div>
                <h4>{val.name}</h4>
                
                <span>${val.price}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cart;
