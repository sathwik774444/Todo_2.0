import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user , loading} = useContext(AuthContext);

  if(loading){
    return <p>Loading...</p>// wait until token check finishes
  }
  
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
