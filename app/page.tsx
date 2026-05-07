import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import PantherHacks from "@/components/PantherHacks";
import Board from "@/components/Board";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Events />
      <PantherHacks />
      <Board />
      <Contact />
      <Footer />
    </>
  );
}
