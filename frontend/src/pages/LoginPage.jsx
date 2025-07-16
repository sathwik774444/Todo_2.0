import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login } from '../services/auth';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      loginUser(res.data);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        alert(`Login failed: ${err.response.data.message}`);
      } else {
        alert('Login failed. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Login</button>
      </form>

      <p style={{ marginTop: '10px' }}>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
