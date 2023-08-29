import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";


export default function Login() {
 
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  
  async function handleLogin() {
    const user = {
      email:email,
      password:password,
      
    }
    console.log(user)
    try {
      const res = await axios.post("http://localhost:5000/auth/login",user)
      console.log(res.data)
      localStorage.setItem("token",res.data.token)
      navigate("/home")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
      <h1 className="login-title">Login</h1>
        <div data-testid="loginBox" className="loginBox">
          <div>
            <input
              className="input-style-login"
              data-testid="email"
              type="email"
              value={email}
              name="email"
              id="email"
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              className="input-style-login"
              data-testid="password"
              type="password"
              name="password"
              value={password}
              id="password"
              placeholder="Enter Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="container-btn-para">
            <input
              data-testid="loginButton"
              className="login-btn"
              type="submit"
              id="loginButton"
              value="Login"
              onClick={() => {
                handleLogin();
              }}
            />
          </div>
          <p className="loginPara">
            &nbsp; New user
            <Link data-testid="signupLink" id="signupLink" to="/signup">
              &nbsp; Signup
            </Link>
          </p>
        </div>
      </div>

    
    </div>
  );
}
