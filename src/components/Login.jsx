import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc'; // Install: npm install react-icons

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/welcome');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <motion.div 
          className="p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center"
          >
          </motion.div>

          <motion.h1 
            className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Welcome Back
          </motion.h1>

          <motion.p 
            className="text-gray-600 text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Sign in to access your dashboard
          </motion.p>

          <motion.button
            onClick={handleGoogleSignIn}
           className="flex items-center justify-center w-full px-6 py-4 space-x-4 text-gray-700 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FcGoogle className="text-2xl" />
            <span className="font-medium">Continue with Google</span>
          </motion.button>

          <motion.p 
            className="mt-6 text-sm text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            By signing in, you agree to our Terms and Privacy Policy
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
