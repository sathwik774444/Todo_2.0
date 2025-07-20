import { signup } from '../services/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Auth.css"; // Import the CSS
// import React from "react";

const SignupPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data being sent:");
    console.log("Name:", formData.username);
    console.log("Email:", formData.email);
    console.log("Password:", formData.password);
    try {
      console.log('Sending form data:', formData);
      await signup(formData);
      alert('Signup successful!');
      navigate('/login');
    } catch (err) {
      console.error('Signup error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        alert(`Signup failed: ${err.response.data.message}`);
      } else {
        alert('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="auth-container">
    <form onSubmit={handleSubmit} className="auth-form">
      <h2 className="auth-title">Sign Up</h2>
      <input
        placeholder="Username"
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      /><br />
      <input
        placeholder="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      /><br />
      <input
        placeholder="Password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      /><br />
      <button type="submit">Sign Up</button>
      <p className="auth-switch">Already have an account? <a href="/login">Login</a></p>
    </form>
    </div>
  );
};

export default SignupPage;

