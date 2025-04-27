import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#e0e7ff] text-gray-800 p-8">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-5xl font-bold mb-8 text-center text-blue-600">
          About Us
        </h1>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Image section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              alt="Team working"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
            <p className="text-lg leading-relaxed mb-4">
              We're a team of passionate creators and innovators who love to
              build beautiful digital experiences. From idea to execution, we
              believe in crafting clean, user-first interfaces with a sprinkle
              of animation magic.
            </p>
            <p className="text-lg leading-relaxed text-blue-800 font-medium">
              Let’s create something amazing together.
            </p>
          </motion.div>
        </div>

        {/* Features section */}
        <div className="mt-16 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["Design", "Development", "Animation", "Performance", "UI/UX", "Support"].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-2xl shadow-lg p-6 text-center"
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-600">{item}</h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
