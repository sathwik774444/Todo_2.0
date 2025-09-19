import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

//pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import TodoListPage from './pages/TodoListPage';

function App() {
  return (
       <Router>
        <Routes>
          {/*Public Routes*/}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/category/:id" 
          element={
              <ProtectedRoute>
                <TodoListPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
  );
}

export default App;