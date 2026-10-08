import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Courses from "../components/Courses";
import Tracks from "../components/Tracks";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Courses />
      <Tracks />
    </main>
  );
}