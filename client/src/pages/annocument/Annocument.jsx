import React from "react"
import  carImg  from "./images/banner-1.png"
import  mapImg  from "./images/banner-2.png"



const Annocument = () => {
  const mystyle = {
    width: "30%",
    height: "340px",
  }
  const mystyle1 = {
    width: "68%",
    height: "340px",
  }
  return (
    <>
      <section className='annocument background'>
        <div className='container d_flex'>
          <div className='img' style={mystyle}>
            <img src={carImg} width='100%' height='100%' alt="Annocument pic"/>
          </div>
          <div className='img' style={mystyle1}>
            <img src={mapImg} width='100%' height='100%' alt="Annocument pic" />
          </div>
        </div>
      </section>
    </>
  )
}

export default Annocument;
