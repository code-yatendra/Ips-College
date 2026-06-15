import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface WelcomePageProps {
  onNext: () => void;
}

const WelcomePage = ({ onNext }: WelcomePageProps) => {
  return (
    <div className="min-h-screen hero-gradient flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4"
      >
        {/* Indian Emblem */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto bg-card rounded-full p-4 card-shadow flex items-center justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
              alt="Emblem of India"
              className="w-24 h-24 object-contain"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-primary-foreground mb-4 tracking-tight"
        >
          IPS GROUP OF COLLEGES
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-24 h-1 bg-secondary mx-auto mb-6 rounded-full"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-lg md:text-xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto"
        >
          Excellence in Education | Empowering Future Leaders
        </motion.p>

        {/* Continue Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="bg-secondary text-secondary-foreground font-heading font-semibold px-10 py-4 rounded-lg text-lg button-shadow hover:shadow-xl transition-all duration-300"
        >
          View Student Results
        </motion.button>
        <div className="flex justify-center gap-4 mt-6">
  <Link to="/admin/login">
    <button className="bg-white text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
      Admin Login
    </button>
  </Link>

  <Link to="/admin/signup">
    <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
      Admin Signup
    </button>
  </Link>
</div>
      </motion.div>

      {/* Bottom decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-secondary via-accent to-secondary"
      />
    </div>
  );
};

export default WelcomePage;
