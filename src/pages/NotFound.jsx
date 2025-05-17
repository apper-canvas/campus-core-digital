import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getIcon } from '../utils/iconUtils.js'

const NotFound = () => {
  const ArrowLeftIcon = getIcon('ArrowLeft')
  const AlertCircleIcon = getIcon('AlertCircle')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-lg text-center">
        <div className="mb-6 flex justify-center">
          <AlertCircleIcon className="w-24 h-24 text-accent animate-pulse" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Page Not Found
        </h2>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8 text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/" 
          className="btn btn-primary inline-flex items-center group"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>
    </motion.div>
  )
}

export default NotFound