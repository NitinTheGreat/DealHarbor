'use client';
import React, { useState } from 'react';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [formMessage, setFormMessage] = useState(null); // State for form submission messages

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (id === 'password') {
      // Password strength checking
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
      // Check password match on password change
      setPasswordMatch(formData.confirmPassword === value);
    } else if (id === 'confirmPassword') {
      // Password match checking
      setPasswordMatch(formData.password === value);
    } else if (id === 'email') {
      // Email format validation
      setEmailValid(validateEmail(value));
    }
  };

  const checkPasswordStrength = (password) => {
    // Password strength logic (replace with your desired criteria)
    if (password.length < 8) {
      return 'weak';
    } else if (password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password)) {
      return 'very-strong';
    } else {
      return 'strong';
    }
  };

  const validateEmail = (email) => {
    // Basic email format validation
    const isValid = /\S+@\S+\.\S+/.test(email);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setFormMessage({ type: 'success', text: responseData.message });
        // Optionally, you can redirect the user to another page or perform other actions upon successful signup
      } else {
        setFormMessage({ type: 'error', text: responseData.message });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormMessage({ type: 'error', text: 'An error occurred. Please try again later.' });
    }
  };

  const isFormValid = () => {
    return emailValid && passwordMatch && formData.password.length >= 8;
  };

  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-b from-gray-100 via-gray-200 to-transparent mt-20">
      <div className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 bg-white p-8 rounded-lg shadow-lg">
        <h3 className="mb-6 text-2xl text-center text-gray-800">Create an Account!</h3>
        <form className="px-4 py-6 bg-white rounded" onSubmit={handleSubmit}>
          {formMessage && (
            <div className={`mb-4 text-center text-sm ${formMessage.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              {formMessage.text}
            </div>
          )}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Your Name"
              onChange={handleInputChange}
              value={formData.name}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${emailValid ? 'border-green-500' : 'border-red-500'}`}
              id="email"
              type="email"
              placeholder="Email"
              onChange={handleInputChange}
              value={formData.email}
              required
            />
            {emailValid && (
              <p className="text-xs italic text-green-500">Email is correct.</p>
            )}
            {!emailValid && (
              <p className="text-xs italic text-red-500">Please enter a valid email address.</p>
            )}
          </div>
          <div className="mb-4 md:flex md:justify-between">
            <div className="mb-4 md:mr-2 md:mb-0">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${passwordStrength === 'weak' ? 'border-red-500' : passwordStrength === 'strong' ? 'border-yellow-500' : passwordStrength === 'very-strong' ? 'border-green-500' : ''}`}
                id="password"
                type="password"
                placeholder="******************"
                onChange={handleInputChange}
                value={formData.password}
                required
              />
              {formData.password.length > 0 && (
                <p
                  className={`text-xs italic ${
                    passwordStrength === 'weak'
                      ? 'text-red-500'
                      : passwordStrength === 'strong'
                        ? 'text-yellow-500'
                        : passwordStrength === 'very-strong'
                          ? 'text-green-500'
                          : ''
                  }`}
                >
                  Password strength: {passwordStrength || 'weak'}
                </p>
              )}
            </div>
            <div className="md:ml-2">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${passwordMatch ? 'border-green-500' : 'border-red-500'}`}
                id="confirmPassword"
                type="password"
                placeholder="******************"
                onChange={handleInputChange}
                value={formData.confirmPassword}
                required
              />
              {!passwordMatch && (
                <p className="text-xs italic text-red-500">Passwords do not match.</p>
              )}
            </div>
          </div>
          <hr className="mb-6 border-t" />
          <div className="mb-6 text-center">
            <button
              className={`w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline ${isFormValid() ? '' : 'opacity-50 cursor-not-allowed'}`}
              type="submit"
              disabled={!isFormValid()}
            >
              Register Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
