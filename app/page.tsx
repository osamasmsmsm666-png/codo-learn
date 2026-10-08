import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Courses from "../components/Courses";
import Tracks from "../components/Tracks";
import WhyCodo from "../components/WhyCodo";
import Instructors from "../components/Instructors";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <Courses />

      <Tracks />

      <WhyCodo />

      <Instructors />

      <CTA />

      <Footer />
    </main>
  );
}