import { motion } from "framer-motion";
// import Button from "../../shared/Button/Button";

const AboutHero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-800 to-gray-800 text-white overflow-hidden flex flex-col items-center justify-center">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/FKhkbQNY/Zeeta-Max-Electric-Blue-1946x.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // transform: `translateY(${parallaxOffset}px)`,
        }}
      />
      <div className="absolute inset-0 bg-black opacity-80" />

      {/* Content Container */}
      <div className="relative z-10 w-[90%] md:w-[88%] mx-auto pt-32 pb-12 flex flex-col lg:flex-row items-center justify-between">
        {/* Text Content */}
        <motion.div
          className="lg:w-1/2 w-full space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
            About us
          </h1>
          <p className="text-xl text-gray-300 max-w-xl">
            Experience the ultimate in luxury, performance, and style. Explore
            our meticulously curated collection of premium vehicles, crafted to
            deliver an unparalleled driving experience. Redefine the way you
            travel—your perfect ride awaits.
          </p>
          {/* <Button text="Contact us" /> */}
        </motion.div>

        {/* Car Image Carousel */}
        <motion.div
          className="lg:w-1/2 w-full mt-12 lg:mt-0"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://i.postimg.cc/7YD4ZPVJ/51-Ut8ef9-V9-L.jpg"
              alt="Luxury car"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-40" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutHero;
