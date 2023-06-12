import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../../Form/SearchInput";
import useCategory from "../../../hooks/useCategory";
import { useCart } from "../../../context/cart";
import { Badge } from "antd";


//
import logo from "./images/logo.png";
import "./Header.css"

//
const Header = () => {
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
  return (
    <>
    <div className="headerCont">
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top ">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img src={logo} style={{ width: "40px" }} alt="" />
                <span
                  style={{
                    marginLeft: "10px",
                    fontSize: "24px",
                    fontWeight: "700",
                    color: "#e98337",
                  }}
                >
                  Lubick
                </span>
              </div>
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c, index) => (
                    <li key={index}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                <div
                      style={{
                        width: "35px",
                        height: "35px",
                        border: "3px solid gray",
                        backgroundColor: "linear-gradient(to right, red , yellow)",
                        margin: "auto",
                        display:"flex",
                        borderRadius:"50%",
                        
                      }}
                    >
                      <p
                        style={{
                          fontSize: "28px",
                          fontWeight: "bold",
                          height: "32px",
                          width:"32px",
                          textAlign: "center",
                          marginTop:"2px"

                        }}
                      >
                        {auth?.user?.name[0]}
                      </p>
                    </div>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={`/dashboard/user/profile`}
                          className="dropdown-item"
                        >
                          Profile Setting
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  <Badge count={cart?.length} showZero offset={[10, -5]} >
                    Cart
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </div>
    </>
  );
};

export default Header;
