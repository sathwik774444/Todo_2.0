// import { useState, useContext } from 'react';
// import { signup } from '../services/auth';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const SignupPage = () => {
//   const [form, setForm] = useState({ username: '', email: '', password: '' });
//   const { loginUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await signup(form);
//       loginUser(res.data);
//       navigate('/');
//     } catch (err) {
//       alert('Signup failed.');
//     }
//   };

//   return (
//     <form onSubmit={handleSignup}>
//       <h2>Sign Up</h2>
//       <input name="username" placeholder="Username" onChange={handleChange} />
//       <input name="email" placeholder="Email" onChange={handleChange} />
//       <input name="password" type="password" placeholder="Password" onChange={handleChange} />
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// };

// export default SignupPage;



import { signup } from '../services/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Username"
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
    </form>
  );
};

export default SignupPage;
