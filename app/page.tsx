import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import DigitalSolutions from "../components/DigitalSolutions";
import Tracks from "../components/Tracks";
import Interns from "../components/Interns";
import WhyCodo from "../components/WhyCodo";
import Reviews from "../components/Reviews";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <DigitalSolutions />

      <Tracks />

      <Interns />

      <WhyCodo />

      <Reviews />

      <CTA />

      <Footer />
    </main>
  );
}