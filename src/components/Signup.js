import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to track confirm password visibility
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`http://localhost:5001/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate('/');
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "cpassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className='container mt-2'>
      <div className='text-center mb-3'>
        <h1>NoteBridge</h1>
        <p><b>Bridging Your Thoughts to the Cloud ☁️</b></p>
      </div>
      <p className='my-2 text-center'><i>New to NoteBridge? 👉🏻Create a new account here! </i></p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              value={credentials.password}
              name="password"
              onChange={onChange}
              minLength={5}
              required
            />
            <span className="input-group-text">
              <i
                className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"} view-password`}
                onClick={() => togglePasswordVisibility("password")}
              ></i>
            </span>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <div className="input-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-control"
              id="cpassword"
              value={credentials.cpassword}
              name="cpassword"
              onChange={onChange}
              minLength={5}
              required
            />
            <span className="input-group-text">
              <i
                className={`fa ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"} view-password`}
                onClick={() => togglePasswordVisibility("cpassword")}
              ></i>
            </span>
          </div>
        </div>
        <div className="container text-center mb-3">
          <button type="submit" className="btn btn-primary">SignUp</button>
        </div>
      </form>
      <p className='text-center'>Already have an account? <a href="/login">Login-&gt;</a> </p>
    </div>
  );
}

export default Signup;
