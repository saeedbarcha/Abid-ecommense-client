import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RiUser3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


import axios from "axios";
import {
  HiOutlineMail,
  HiDevicePhoneMobile,
  HiOutlineDevicePhoneMobile,
} from "react-icons/hi";
import { RiLock2Line, RiEyeCloseFill } from "react-icons/ri";
import { FcSportsMode} from "react-icons/fc";

import {
  MdOutlinePeople,
  MdRemoveRedEye,
  MdOutlinePhoneIphone,
  MdLocationOn,
} from "react-icons/md";
import {
  Main,
  LogoCont,
  Logo,
  FormCont,
  FormHead,
  FormBody,
  Em,
  SvgStyle,
  FormInputDiv,
  FormInput,
  FormSelect,
  FormOption,
  FormButton,
  SwitchCont,
  SwitchPara,
  SwitchSpan,
  TermsConCont,
} from "./SignUpElements";
import LogoMain from "./Images/logo.jpg";

const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        dateOfBirth,
        gender,
        answer,
      });
      if(!name || !email || !password|| !phone || !address || !dateOfBirth ||
        !gender || !answer){
      } 
      // const emailRegix =  /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };



  return (
    <>
      <Main>
        <LogoCont>
          <Logo src={LogoMain} alt="main-logo"></Logo>
        </LogoCont>
        <FormCont>
          <FormHead>Sign Up</FormHead>
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
              <Em style={SvgStyle}>
                {showCPassword ? (
                  <MdRemoveRedEye
                    onClick={() => setShowCPassword(!showCPassword)}
                    
                  />
                ) : (
                  <RiEyeCloseFill
                    onClick={() => setShowCPassword(!showCPassword)}
                  />
                )}
              </Em>
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
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                
                id="sports"
                placeholder="enter gender"
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
            
            
        
          
          </FormBody>

          <FormButton type="submit" onClick={handleSubmit}>Sign Up</FormButton>
          {/* <FormButton type="submit">Sign Up</FormButton> */}

        </FormCont>
        <SwitchCont>
          <SwitchPara>
            Already having account?{" "}
            <Link to="/login ">
              <SwitchSpan> Log In Here</SwitchSpan>
            </Link>
          </SwitchPara>
        </SwitchCont>

        <TermsConCont>
          <SwitchPara>
            By clicking Sign Up, you agree to our Terms and Conditions. Learn
            how we collect, use and share your data in our Data Policy and how
            we use cookies and similar technology in our Cookies Policy. You may
            receive SMS Notifications from us and can opt out any time.
          </SwitchPara>
        </TermsConCont>
      </Main>
    </>
  );
};

export default SignUp;
