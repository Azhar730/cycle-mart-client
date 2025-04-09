import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface IProps {
  heading: string;
  description?: string;
}

const SectionHead = ({ heading, description }: IProps) => {
  // Hook to detect if the section is in view
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation once when the section is in view
    threshold: 0.5, // Trigger when 50% of the section is visible
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: inView ? 1 : 0, // Fade in when in view
        y: inView ? 0 : 20, // Slide up when in view
      }}
      transition={{ duration: 0.8 }}
      className="flex justify-center items-center flex-col gap-3 mb-8"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary">
        {heading}
      </h2>
      <p className="text-gray-800 font-normal text-center w-3/4 mx-auto">
        {description}
      </p>
    </motion.div>
  );
};

export default SectionHead;
