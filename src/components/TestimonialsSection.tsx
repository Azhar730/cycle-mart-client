import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Import Swiper styles
import "swiper/swiper-bundle.css";
import { ITestimonial, testimonials } from "@/data/testimonials";
import SectionHead from "./SectionHead";

const TestimonialCard = ({ testimonial }: { testimonial: ITestimonial }) => (
  <div>
    <div className="flex items-center mb-4">
      <img
        src={testimonial.avatar || "/placeholder.svg"}
        alt={testimonial.name}
        className="rounded-full mr-4"
      />
      <div>
        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
        <p className="text-gray-600">{testimonial.role}</p>
      </div>
    </div>
    <p className="text-gray-700 italic">&ldquo;{testimonial.comment}&rdquo;</p>
  </div>
);

export const TestimonialsSection = () => {
  // Hook to detect if the section is in view
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation once when the section is in view
    threshold: 0.5, // Trigger when 50% of the section is visible
  });

  return (
    <section ref={ref} className="mb-12 md:mb-16">
      <div className="w-[90%] md:w-[88%] mx-auto">
        <SectionHead
          heading="What Our Customers Say"
          description="Hear from our satisfied customers about their experiences with our services and products."
        />
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={35}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination", // Ensure pagination is targeted correctly
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <motion.div
                className="bg-white rounded-lg shadow-lg p-6 h-[300px] flex flex-col justify-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: inView ? 1 : 0, // Fade in when in view
                  y: inView ? 0 : 20, // Slide up when in view
                }}
                transition={{ duration: 0.5 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
