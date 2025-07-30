import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login } from '../services/auth';
import { useNavigate} from 'react-router-dom';
import Preloader from '../components/Preloader'; // import the preloader

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // track preloader
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // show preloader when login starts
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
    finally {
      setLoading(false); // hide preloader after success/fail
    }
  };

  if (loading) {
    return <Preloader />; // show preloader instead of form
  }

  return (
     <div className="auth-container">
    <form onSubmit={handleLogin} className="auth-form">
      <h2 className="auth-title">Login</h2>
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
      <p className="auth-switch">
        Don't have an account?  <a href="/signup">SignUp</a>
      </p>
    </form>
    </div>
  );
};

export default LoginPage;
