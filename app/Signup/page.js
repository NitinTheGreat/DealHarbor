'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/');
    }
  }, [router]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (id === 'password') {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
      setPasswordMatch(formData.confirmPassword === value);
    } else if (id === 'confirmPassword') {
      setPasswordMatch(formData.password === value);
    } else if (id === 'email') {
      setEmailValid(validateEmail(value));
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 8) {
      return 'weak';
    } else if (password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password)) {
      return 'very-strong';
    } else {
      return 'strong';
    }
  };

  const validateEmail = (email) => {
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
        setSuccessMessage('Sign-up successful! Redirecting...');
        setIsSuccessful(true);
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });

        setTimeout(() => {
          router.push('/Login');
        }, 3000); // Wait 3 seconds before redirecting
      } else {
        setSuccessMessage(responseData.message);
        setIsSuccessful(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const isFormValid = () => {
    return emailValid && passwordMatch && formData.password.length >= 8;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 p-8 rounded-lg shadow-lg mt-14">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">Create your account</h2>
          {successMessage && (
            <p className={`mt-2 text-center text-sm ${isSuccessful ? 'text-green-500' : 'text-red-500'}`}>
              {successMessage}
            </p>
          )}
          <p className="mt-2 text-center text-sm text-pink-300">
            Or{" "}
            <a className="font-medium text-pink-500 hover:text-pink-400" href="Login">
              sign in to your existing account
            </a>
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
              Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="h-10 border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 block w-full rounded-md border-gray-300 pr-10 focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Enter your name"
                onChange={handleInputChange}
                value={formData.name}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
              Email address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`h-10 border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 block w-full rounded-md border-gray-300 pr-10 focus:border-primary focus:ring-primary sm:text-sm ${emailValid ? 'border-green-500' : 'border-red-500'}`}
                placeholder="you@example.com"
                onChange={handleInputChange}
                value={formData.email}
              />
              {emailValid && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <CheckIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                </div>
              )}
            </div>
            {!emailValid && (
              <p className="text-xs italic text-red-500">Please enter a valid email address.</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className={`h-10 border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 block w-full rounded-md border-gray-300 pr-10 focus:border-primary focus:ring-primary sm:text-sm ${passwordStrength === 'weak' ? 'border-red-500' : passwordStrength === 'strong' ? 'border-yellow-500' : passwordStrength === 'very-strong' ? 'border-green-500' : ''}`}
                placeholder="Password"
                onChange={handleInputChange}
                value={formData.password}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                )}
              </button>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-12 space-x-2">
                {formData.password.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <div className={`h-2 w-2 rounded-full ${passwordStrength === 'very-strong' ? 'bg-green-500' : passwordStrength === 'strong' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                    <span className="text-sm text-muted-foreground">{passwordStrength === 'very-strong' ? 'Strong' : passwordStrength === 'strong' ? 'Moderate' : 'Weak'}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-muted-foreground">
              Confirm Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className={`h-10 border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 block w-full rounded-md border-gray-300 pr-10 focus:border-primary focus:ring-primary sm:text-sm ${passwordMatch ? 'border-green-500' : 'border-red-500'}`}
                placeholder="Confirm Password"
                onChange={handleInputChange}
                value={formData.confirmPassword}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                )}
              </button>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-12 space-x-2">
                {formData.confirmPassword.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <div className={`h-2 w-2 rounded-full ${passwordMatch ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-sm text-muted-foreground">{passwordMatch ? 'Match' : 'No Match'}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className={`w-full h-10 rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white shadow-sm ring-offset-background hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${isFormValid() ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
              disabled={!isFormValid()}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EyeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5C7.03 5 3.28 8.66 2 12c1.28 3.34 5.03 7 10 7s8.72-3.66 10-7c-1.28-3.34-5.03-7-10-7zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
    </svg>
  );
}

function EyeOffIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-muted-foreground" // Use this class to apply consistent styling if needed
    >
      <path d="M1 12c1.5-3.1 5.1-6 11-6s9.5 2.9 11 6-4.5 6-11 6S2.5 15.1 1 12z" />
      <path d="M10.3 10.3c.6-.6 1.4-.8 2.2-.8s1.6.2 2.2.8" />
      <path d="M4.9 4.9L19.1 19.1" />
    </svg>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
