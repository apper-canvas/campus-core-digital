import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../App';

function Login() {
  const { isInitialized } = useContext(AuthContext);

  useEffect(() => {
    if (isInitialized) {
      // Show login UI in this component
      const { ApperUI } = window.ApperSDK;
      ApperUI.showLogin("#authentication");
    }
  }, [isInitialized]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-50 dark:bg-surface-900">
      <div className="w-full max-w-md space-y-8 p-6 bg-white dark:bg-surface-800 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-surface-800 dark:text-surface-100">Welcome to CampusCore</h1>
          <p className="mt-2 text-surface-600 dark:text-surface-400">Sign in to your account</p>
        </div>
        
        <div className="p-6 bg-white dark:bg-surface-800 rounded-lg">
          <div id="authentication" className="min-h-[300px] flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            <div className="ml-2">Loading authentication...</div>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-sm text-surface-600 dark:text-surface-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary hover:text-primary-dark">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;