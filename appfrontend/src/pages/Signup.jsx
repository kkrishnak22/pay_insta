import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import axios from 'axios'
export default function Signup() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  async function handleSignup() {
    const user = {
      email:email,
      password:password,
      name:userName
    }
    console.log(user)
    try {
      const res = await axios.post("http://localhost:5000/auth/signup",user)
      console.log(res.data)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="register-container">
      <div className="register-form">
        <h1 className="navbar-register">Register</h1>
        <input
          data-testid="email"
          className="input-style-signup"
          type="email"
          name="email"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <input
          data-testid="username"
          className="input-style-signup"
          type="text"
          name="name"
          id="name"
          placeholder="Enter name"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />

        <input
          data-testid="mobileNumber"
          className="input-style-signup"
          type="text"
          name="mobileNumber"
          id="mobileNumber"
          placeholder="Enter Mobilenumber"
          value={mobileNumber}
          onChange={(e) => {
            setMobileNumber(e.target.value);
          }}
        />

        <input
          data-testid="password"
          className="input-style-signup"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <div>
          <input
            data-testid="loginButton"
            className="login-btn"
            type="submit"
            id="loginButton"
            value="Login"
            onClick={() => {
              handleSignup();
            }}
          />
        </div>
        <p className="loginPara">
          &nbsp; Don't have an account
          <Link data-testid="signupLink" id="signupLink" to="/">
            &nbsp; Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
