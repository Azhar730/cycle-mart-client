import Banner from "@/components/Banner";
import FeaturedBicycle from "@/components/FeaturedBicycles";
import { TestimonialsSection } from "@/components/TestimonialsSection";

const Home = () => {
    return (
        <div>
            <Banner/>
            <FeaturedBicycle/>
            <TestimonialsSection/>
        </div>
    );
};

export default Home;