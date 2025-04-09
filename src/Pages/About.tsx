import AboutHero from "@/components/About/AboutHero";
import ServiceSection from "@/components/About/ServiceSection";
import { ScrollRestoration } from "react-router-dom";

const About = () => {
  return (
    <div>
      <AboutHero />
      <ServiceSection />
      <ScrollRestoration />
    </div>
  );
};

export default About;
