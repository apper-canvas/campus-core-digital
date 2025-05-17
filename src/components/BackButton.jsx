import { useNavigate } from 'react-router-dom';
import { getIcon } from '../utils/iconUtils.js';

const BackButton = ({ label = "Back", className = "" }) => {
  const navigate = useNavigate();
  const ArrowLeftIcon = getIcon('ArrowLeft');
  
  return (
    <button 
      onClick={() => navigate(-1)}
      className={`inline-flex items-center text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary transition-colors ${className}`}
      aria-label="Go back to previous page"
    >
      <ArrowLeftIcon className="w-4 h-4 mr-2" />
      <span>{label}</span>
    </button>
  );
};
export default BackButton;