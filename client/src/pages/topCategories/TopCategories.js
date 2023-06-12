import React from "react"
import "./style.css"
import TopCart from "./TopCart"
import { MdOutlineGppGood} from "react-icons/md";
import { BsPlayFill} from "react-icons/bs";




const TopCategories = () => {

  const moreIcon={
    width:"30px",
    height:"30px",
    color:"#e94560"
  }

  return (
    <>
      <section className='TopCate background'>
        <div className='container'>
          <div className='heading1 d_flex1'>
            <div className='heading-left1   f_flex1' style={{display:"flex"}}>
              <MdOutlineGppGood style={{width:"40px", height:"40px", color:"38E54D"}}/>
              {/* EB455F */}
              <h2>Top Categories</h2>
            </div>
            <div className='heading-right1 '>
              <span>View all</span>
              <BsPlayFill style={moreIcon}/>
            </div>
          </div>
          <TopCart />
        </div>
      </section>
    </>
  )
}

export default TopCategories
