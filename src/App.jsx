import NavBar from "./components/NavBar";
import HeroSection from "./sections/HeroSection";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import MessageSection from "./sections/MessageSection";
import FlavorSection from "./sections/FlavorSection";
import NutritionSection from "./sections/NutritionSection";
import BenefitSection from "./sections/BenefitSection";
import TestimonialSection from "./sections/TestimonialSection";
import FooterSection from "./sections/FooterSection";
import { useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [activeLink, setActiveLink] = useState("hero");

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    const handleActiveLink = () => {
      const sections = ["hero", "bunkeres", "iluminacion", "enmiendas", "insumos", "cta"];
      let currentSection = "hero";
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            currentSection = sectionId;
          }
        }
      }
      
      if (currentSection === "hero") setActiveLink("hero");
      else if (currentSection === "bunkeres") setActiveLink("bunkeres");
      else if (currentSection === "iluminacion" || currentSection === "enmiendas") setActiveLink("iluminacion");
      else if (currentSection === "insumos") setActiveLink("insumos");
      else if (currentSection === "cta") setActiveLink("cta");
    };

    window.addEventListener("scroll", handleActiveLink, { passive: true });
    handleActiveLink();

    return () => {
      window.removeEventListener("load", onLoad);
      window.removeEventListener("scroll", handleActiveLink);
    };
  }, []);

  return (
    <main>
      <NavBar onLinkClick={scrollToSection} activeLink={activeLink} />
      <HeroSection />
      <MessageSection />
      <FlavorSection />
      <NutritionSection />
      <BenefitSection />
      <TestimonialSection />
      <FooterSection />
    </main>
  );
};

export default App;
