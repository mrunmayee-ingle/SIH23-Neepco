import React, { useState } from "react";
import "./styles/signup.css"; // Create a new CSS file for the Signup page
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import useSignup from "../hooks/useSignup";

function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");

  const { signup } = useSignup();

  const handleNext = () => {
    if (step === 1) {
      // Ensure password and confirmPassword match
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
    }

    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    await signup({
      firstName,
      lastName,
      email,
      phoneNumber,
      username,
      password,
      aadharNumber,
      panNumber,
      gstNumber,
    });

    // Redirect to a success page or dashboard upon successful signup
    navigate("/Login");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h1>Step 1: Personal Details</h1>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        );
      case 2:
        return (
          <>
            <h1>Step 2: Aadhar Card Number</h1>
            <input
              type="text"
              placeholder="Aadhar Card Number"
              value={aadharNumber}
              onChange={(e) => setAadharNumber(e.target.value)}
            />
          </>
        );
      case 3:
        return (
          <>
            <h1>Step 3: PAN Card Number</h1>
            <input
              type="text"
              placeholder="PAN Card Number"
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value)}
            />
          </>
        );
      case 4:
        return (
          <>
            <h1>Step 4: GST Number</h1>
            <input
              type="text"
              placeholder="GST Number"
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value)}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="signup-wrapper">
      <nav className="navbar">
        <img src={logo} onClick={() => navigate("../")} alt="Logo" />
        <div className="navbar-buttons"></div>
      </nav>
      <div className="content-wrapper">
        <div className="signup-form-container">
          <form className="signup-form">
            {renderStep()}
            <div className="button-container">
              {step > 1 && (
                <button className="prev-button" onClick={handlePrev}>
                  Previous
                </button>
              )}
              {step < 4 ? (
                <button className="next-button" onClick={handleNext}>
                  Next
                </button>
              ) : (
                <button className="submit-button" onClick={handleNext}>
                  Signup
                </button>
              )}
            </div>
            <div className="signup-subtitle">
              <p>Already have an account?</p>
              <Link to="/Login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
