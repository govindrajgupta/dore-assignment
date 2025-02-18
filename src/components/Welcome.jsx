import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa'; // Add this import

const Welcome = () => {
  const [user, setUser] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState('');
  const [showThankYou, setShowThankYou] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning');
    else if (hour < 18) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/');
      }
    });

    // Hide thank you message after 5 seconds
    const timer = setTimeout(() => {
      setShowThankYou(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [navigate]);

  const handleSignOut = () => {
    auth.signOut();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <motion.div 
          className="p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/50"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center"
          >
            <span className="text-2xl text-white">
              {user.displayName ? user.displayName[0].toUpperCase() : '?'}
            </span>
          </motion.div>

          <motion.h1 
            className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
          Good {timeOfDay}!
          </motion.h1>

          <motion.div 
            className="space-y-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
              <p className="text-gray-700">
                <span className="font-semibold">Name:</span> {user.displayName}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
            </div>
          </motion.div>

          <motion.button
            onClick={handleSignOut}
            className="w-full px-6 py-3 text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transform transition-all duration-200 shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign Out
          </motion.button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed bottom-8 right-8 space-y-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-lg shadow-xl"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="font-bold text-lg mb-1">Thank You! 🎉</h3>
                <p className="text-sm opacity-90">
                  We appreciate you giving us a chance to impress you!
                </p>
              </motion.div>
            </motion.div>

            <motion.a
            href="https://devfolio-six-delta.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-4 rounded-xl shadow-xl group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-700 transition-transform duration-300 transform translate-x-full group-hover:translate-x-0" />
            <div className="relative flex items-center justify-between">
              <span className="font-semibold">Explore My Portfolio</span>
              <FaExternalLinkAlt className="ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Welcome;
