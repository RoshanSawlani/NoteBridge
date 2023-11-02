import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5001/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Logged in Successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Credentials");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mt-3">
      <div className="container">
        <h1 className="text-center my-4">NoteBridge</h1>
      </div>
      <p className="text-center my-1">
        <b>Bridging Your Thoughts to the Cloud ☁️</b>
      </p>
      <p className="text-center">
        <i>Login to continue using NoteBridge😊</i>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="name@example.com"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className=" mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            name="password"
            id="password"
          />
          <span className="input-group-text" >
          <i
              className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"} view-password`}
              onClick={togglePasswordVisibility}
            ></i>
          </span>
          </div>
          
        </div>
        
        <div className="container text-center mb-3">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
      <p className="text-center">
        Don't have an account? <a href="/signup">SignUp-&gt;</a>{" "}
      </p>
    </div>
  );
};

export default Login;
