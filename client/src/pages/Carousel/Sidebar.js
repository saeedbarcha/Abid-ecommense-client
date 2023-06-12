import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiFillHome,AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { MdOutlineProductionQuantityLimits, MdManageAccounts } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { GiVineWhip, GiAchillesHeel } from "react-icons/gi";
import { CiPercent } from "react-icons/ci";
import { RiAccountPinBoxFill } from "react-icons/ri";

import { HiRefresh } from "react-icons/hi";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import useCategory from "../../hooks/useCategory";
import toast from "react-hot-toast";
import { Badge } from "antd";

import "./Home.css";

const Sidebar = () => {
  // const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const svgStyle = {
    width: "25px",
    height: "25px",
    color: "#e98337",
  };

  //  function navigateFun (val) {
  //   navigate(`${val}`);
  // }

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="sidebar">
        <div
          className="box f_flex"
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
          onClick={refreshPage}
        >
          <div>
            <HiRefresh style={svgStyle} />
          </div>
          <span>Refersh</span>
        </div>

        <Link to="/" style={{ textDecoration: "none" }}>
          <div
            className="box f_flex"
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <div>
              <AiFillHome style={svgStyle} />
            </div>
            <span>Home</span>
          </div>
        </Link>

        <Link to="/categories" style={{ textDecoration: "none" }}>
          <div
            className="box f_flex1"
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <div>
              <MdOutlineProductionQuantityLimits style={svgStyle} />
            </div>
            <span>Products</span>
          </div>
        </Link>

        {/* <Link to="/categories" style={{ textDecoration: "none" }}>
          <div
            className="box f_flex"
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <div>
              <BiCategoryAlt style={svgStyle} />
            </div>
            <span>Product Categories</span>
          </div>
        </Link> */}

        <Link to="/cart" style={{ textDecoration: "none" }}>
          <div
            className="box f_flex"
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <div>
              <FaShoppingCart style={svgStyle} />
            </div>
            <Badge
              count={cart?.length}
              showZero
              offset={[10, -5]}
              style={{ width: "20px", height: "20px" }}
            >
              Cart
            </Badge>
          </div>
        </Link>

        

        <div
          className="box f_flex"
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <div>
            <GiVineWhip style={svgStyle} />
          </div>
          <span>New Arrivals</span>
        </div>

        <div
          className="box f_flex"
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <div>
            <CiPercent style={svgStyle} />
          </div>
          <span>Big Discounts</span>
        </div>

        <div
          className="box f_flex"
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <div>
            <GiAchillesHeel style={svgStyle} />
          </div>
          <span>Achivements</span>
        </div>

        {!auth?.user ? (
          <>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <div
                className="box f_flex"
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <div>
                  <RiAccountPinBoxFill style={svgStyle} />
                </div>
                <span>Register</span>
              </div>
            </Link>

            <Link to="/login" style={{ textDecoration: "none" }}>
              <div
                className="box f_flex"
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <div>
                  <AiOutlineLogin style={svgStyle} />
                </div>
                <span>Login</span>
              </div>
            </Link>
          </>
        ) : (
          <>
              <Link
                to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="box f_flex"
                  style={{
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                <div>
                  <BiCategoryAlt style={svgStyle} />
                </div>
                <span>Dashboard</span>
                </div>
              </Link>

              <Link
                to={`/dashboard/user/profile`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="box f_flex"
                  style={{
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                 <div>
                  <MdManageAccounts style={svgStyle} />
                </div>
                <span>Profile Settings</span>
                </div>
              </Link>

             
              <Link
                to={`/login`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="box f_flex"
                  style={{
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                 <div>
                  <AiOutlineLogout style={svgStyle} />
                </div>
                <span>Logout</span>
                </div>
              </Link>
              
          </>
        )}

       

       
      </div>
    </>
  );
};

export default Sidebar;

// ////////////////////////////////////////

// import React from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
// import { MdOutlineProductionQuantityLimits } from "react-icons/md";
// import { FaShoppingCart } from "react-icons/fa";
// import { BiCategoryAlt } from "react-icons/bi";
// import { GiVineWhip, GiAchillesHeel } from "react-icons/gi";
// import { TbShoppingCartDiscount } from "react-icons/tb";
// import { CgProfile } from "react-icons/cg";
// import { HiRefresh } from "react-icons/hi";
// import { useAuth } from "../../context/auth";
// import { useCart } from "../../context/cart";
// import useCategory from "../../hooks/useCategory";
// import toast from "react-hot-toast";
// import "./Home.css";

// const Sidebar = () => {
//   // const navigate = useNavigate();
//   const [auth, setAuth] = useAuth();
//   const [cart] = useCart();
//   const categories = useCategory();

//   const handleLogout = () => {
//     setAuth({
//       ...auth,
//       user: null,
//       token: "",
//     });
//     localStorage.removeItem("auth");
//     toast.success("Logout Successfully");
//   };

//   const svgStyle = {
//     width: "25px",
//     height: "25px",
//     color: "#e98337",
//   };

//   //  function navigateFun (val) {
//   //   navigate(`${val}`);
//   // }

//   const refreshPage = () => {
//     window.location.reload();
//   };

//   return (
//     <>
//       <div className="sidebar">
//         <div
//           className="box f_flex"
//           style={{
//             display: "flex",
//             alignContent: "center",
//             alignItems: "center",
//             justifyContent: "flex-start",
//           }}
//           onClick={refreshPage}
//         >
//           <div>
//             <HiRefresh style={svgStyle} />
//           </div>
//           <span>Refersh</span>
//         </div>

//         <Link to="/" style={{ textDecoration: 'none' }}>
//           <div
//             className="box f_flex"
//             style={{
//               display: "flex",
//               alignContent: "center",
//               alignItems: "center",
//               justifyContent: "flex-start",
//             }}
//           >
//             <div>
//               <AiFillHome style={svgStyle} />
//             </div>
//             <span>Home</span>
//           </div>
//         </Link>

//         <Link to="/categories" style={{ textDecoration: 'none' }}>
//           <div
//             className="box f_flex1"
//             style={{
//               display: "flex",
//               alignContent: "center",
//               alignItems: "center",
//               justifyContent: "flex-start",
//             }}
//           >
//             <div>
//               <MdOutlineProductionQuantityLimits style={svgStyle} />
//             </div>
//             <span>Products</span>
//           </div>
//         </Link>

//         <Link to="/categories" style={{ textDecoration: 'none' }}>
//         <div
//           className="box f_flex"
//           style={{
//             display: "flex",
//             alignContent: "center",
//             alignItems: "center",
//             justifyContent: "flex-start",
//           }}
//         >
//           <div >
//             <BiCategoryAlt style={svgStyle} />
//           </div>
//           <span>Product Categories</span>
//         </div>
//         </Link>

//         <div
//           className="box f_flex"
//           style={{
//             display: "flex",
//             alignContent: "center",
//             alignItems: "center",
//             justifyContent: "flex-start",
//           }}
//         >
//           <div>
//             <GiVineWhip style={svgStyle} />
//           </div>
//           <span>New Arrivals</span>
//         </div>

//         <div
//           className="box f_flex"
//           style={{
//             display: "flex",
//             alignContent: "center",
//             alignItems: "center",
//             justifyContent: "flex-start",
//           }}
//         >
//           <div>
//             <TbShoppingCartDiscount style={svgStyle} />
//           </div>
//           <span>Big Discounts</span>
//         </div>

//         <div
//           className="box f_flex"
//           style={{
//             display: "flex",
//             alignContent: "center",
//             alignItems: "center",
//             justifyContent: "flex-start",
//           }}
//         >
//           <div>
//             <FaShoppingCart style={svgStyle} />
//           </div>
//           <span>Orders</span>
//         </div>

//         <div
//           className="box f_flex"
//           style={{
//             display: "flex",
//             alignContent: "center",
//             alignItems: "center",
//             justifyContent: "flex-start",
//           }}
//         >
//           <div>
//             <GiAchillesHeel style={svgStyle} />
//           </div>
//           <span>Achivements</span>
//         </div>

//         <div
//           className="box f_flex"
//           style={{
//             display: "flex",
//             alignContent: "center",
//             alignItems: "center",
//             justifyContent: "flex-start",
//           }}
//         >
//           <div>
//             <CgProfile style={svgStyle} />
//           </div>
//           <span>Profile</span>
//         </div>

//         <div
//           className="box f_flex"
//           style={{
//             display: "flex",
//             alignContent: "center",
//             alignItems: "center",
//             justifyContent: "flex-start",
//           }}
//           onClick={handleLogout}
//         >
//           <div>
//             <AiOutlineLogout style={svgStyle} />
//           </div>
//           <span>Logout</span>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;
