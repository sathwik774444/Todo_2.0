import { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async()=>{
      const token = localStorage.getItem('token');
      if(token){
        try{
          const res = await API.get('/auth/me');
          setUser(res.data);//user without password
        }catch(err){
          console.error('Token invalid or expired:', err);
          localStorage.removeItem('token');//clear bad token
        }
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);//save token for persistence
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};