import About from "@/components/About/About";
import AIPlayground from "@/components/AIPlayground/Simulation";
import Contact from "@/components/Contacts/Contacts";
import Experience from "@/components/Experience/Experience";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Projects from "@/components/Projects/Projects";
import Skills from "@/components/Skills/Skills";


export default function Home() {
  return (
    <section>
      <div className="fixed top-0 left-0 right-0 z-50">
      <Navbar/>
      </div>
      <main className="min-h-screen overflow-hidden">
        <About/>
        <Projects/>
        <Skills/>
        <Experience/>
        <AIPlayground/>   
        <Contact/>             
      </main>
      <Footer/>
    </section>
  
  );
}
