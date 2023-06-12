import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";

import { RiUser3Line } from "react-icons/ri";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import {
  HiOutlineMail,
  HiDevicePhoneMobile,
  HiOutlineDevicePhoneMobile,
} from "react-icons/hi";
import { RiLock2Line, RiEyeCloseFill } from "react-icons/ri";
import {
  MdOutlinePeople,
  MdRemoveRedEye,
  MdOutlinePhoneIphone,
  MdLocationOn
} from "react-icons/md";
import {
  FcSportsMode
} from "react-icons/fc";

import {
  FormCont,
  FormHead,
  FormBody,
  Em,
  SvgStyle,
  FormInputDiv,
  FormInput,
  FormButton,
} from "./SignUpElements";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [photo, setPhoto] = useState("");
  const [gender, setGender]=useState("")
  const [dateOfBirth, setDateOfBirth]=useState("")
  

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
    setGender(gender);
    setDateOfBirth(dateOfBirth);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
        gender,
        dateOfBirth,
        answer
      });
      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Your Profile"}>
      <div
        className="container-fluid mt-5 p-5 dashboard"
        style={{ marginTop: "200px" }}
      >
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <FormCont>
              <FormHead>Update Profile</FormHead>
              <h1></h1>
              <FormBody>
                <FormInputDiv>
                  <RiUser3Line style={SvgStyle} />
                  <FormInput
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="exampleInputEmail1"
                    placeholder="Enter Your Name"
                    required
                    autoFocus
                  ></FormInput>
                  {/* <span style={{color: "red"}}>sadasd</span> */}
                  <Em style={SvgStyle}></Em>
                </FormInputDiv>

                <FormInputDiv>
                  <HiOutlineMail style={SvgStyle} />
                  <FormInput
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="exampleInputEmail1"
                    placeholder="Enter Your Email "
                    required
                  ></FormInput>
                  <Em style={SvgStyle}></Em>
                </FormInputDiv>

                <FormInputDiv>
                  <RiLock2Line style={SvgStyle} />
                  <FormInput
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="exampleInputPassword1"
                    placeholder="Enter Your Password"
                    required
                  ></FormInput>
                  {/* <Em style={SvgStyle}>
                {showCPassword ? (
                  <MdRemoveRedEye
                    onClick={() => setShowCPassword(!showCPassword)}
                  />
                ) : (
                  <RiEyeCloseFill
                    onClick={() => setShowCPassword(!showCPassword)}
                  />
                )}
              </Em> */}
                </FormInputDiv>

                <FormInputDiv>
                  <MdOutlinePhoneIphone style={SvgStyle} />
                  <FormInput
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    id="exampleInputEmail1"
                    placeholder="Enter Your Phone"
                    required
                  ></FormInput>
                  <Em style={SvgStyle}></Em>
                </FormInputDiv>

                <FormInputDiv>
                  <MdLocationOn style={SvgStyle} />
                  <FormInput
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    id="address"
                    placeholder="Enter Your Address"
                    required
                  ></FormInput>
                  <Em style={SvgStyle}></Em>
                </FormInputDiv>

                <FormInputDiv>
                  <FcSportsMode style={SvgStyle} />
                  <FormInput
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    id="sports"
                    placeholder="What is Your Favorite sports"
                    required
                  ></FormInput>
                  <Em style={SvgStyle}></Em>
                </FormInputDiv>

                <FormInputDiv>
                  <FcSportsMode style={SvgStyle} />
                  <FormInput
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    id="sports"
                    placeholder="What is Your Gender"
                    required
                  ></FormInput>
                  <Em style={SvgStyle}></Em>
                </FormInputDiv>

                <FormInputDiv>
                  <FcSportsMode style={SvgStyle} />
                  <FormInput
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    id="sports"
                    placeholder="What is Date of Birth"
                    required
                  ></FormInput>
                  <Em style={SvgStyle}></Em>
                </FormInputDiv>


                {/* <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div> */}
              </FormBody>

              <FormButton type="submit" onClick={handleSubmit} encType="multipart/form-data">
                Update Profile
              </FormButton>
            </FormCont>
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
