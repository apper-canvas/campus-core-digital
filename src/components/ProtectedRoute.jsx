import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.user);
  const location = useLocation();
  
  useEffect(() => {
    // If user is not authenticated and this protection was triggered,
    // inform them they need to log in first
    if (!isAuthenticated) {
      toast.info('Please sign in to access this page');
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    // Redirect to login with the current location as redirect target
    return (
      <Navigate 
        to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }
  return children;
};

export default ProtectedRoute;