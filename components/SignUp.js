'use client';
import React, { useState, useEffect } from 'react';
import '../styles/SignUp.css'; // Import your regular CSS file

const SignUp = ({ onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false); // Initially hide sign-up form

  useEffect(() => {
    const handleShowSignUp = () => {
      setShowSignUp(true);
    };

    const handleCloseSignUp = () => {
      setShowSignUp(false);
    };

    const signupClose = document.getElementById("signup-close");

    if (signupClose) {
      signupClose.addEventListener("click", handleCloseSignUp);
    }

    return () => {
      if (signupClose) {
        signupClose.removeEventListener("click", handleCloseSignUp);
      }
    };
  }, []);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length < 8) {
      setPasswordStrength('Too short');
    } else if (value.length < 10) {
      setPasswordStrength('Weak');
    } else if (value.length < 12) {
      setPasswordStrength('Strong');
    } else {
      setPasswordStrength('Very strong');
    }

    setPasswordMatch(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordMatch(value === password);
  };

  if (!showSignUp) {
    return (
      <div className="signup__closed">
        <p>Already Have an account? <a href="#" onClick={onSwitchToLogin}>Login</a></p>
      </div>
    );
  }

  return (
    <div className="signup" id="signup">
      <form className="signup__form">
        <h2 className="signup__title">Sign Up</h2>
        <div className="signup__group">
          <label className="signup__label">Your Name</label>
          <input
            type="text"
            className="signup__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div className="signup__group">
          <label className="signup__label">Email</label>
          <input
            type="email"
            className="signup__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="signup__group">
          <label className="signup__label">Password</label>
          <input
            type="password"
            className="signup__input"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
          />
          <small>Password strength: {passwordStrength}</small>
        </div>
        <div className="signup__group">
          <label className="signup__label">Confirm Password</label>
          <input
            type="password"
            className="signup__input"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm your password"
          />
          {!passwordMatch && <small style={{ color: 'red' }}>Passwords do not match</small>}
        </div>
        <button type="submit" className="signup__button">
          Sign Up
        </button>
        <div className="signup__login">
          <p>Already Have an account? <a href="#" onClick={onSwitchToLogin}>Login</a></p>
        </div>
      </form>
      <i className="ri-close-line signup__close" id="signup-close" />
    </div>
  );
};

export default SignUp;
