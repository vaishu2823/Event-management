import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedEvents from "@/components/FeaturedEvents";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>EventHub - Create & Discover Amazing Events</title>
        <meta
          name="description"
          content="The modern platform for hosting, discovering, and RSVPing to events. Seamless experience from invitation to check-in."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <FeaturedEvents />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
