import { useRef } from "react";
import { cards } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const TestimonialSection = () => {
  const vdRef = useRef([]);

  useGSAP(() => {
    gsap.set(".testimonials-section", {
      marginTop: "-140vh",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top bottom",
        end: "200% top",
        scrub: true,
      },
    });

    tl.to(".testimonials-section .first-title", {
      xPercent: 70,
    })
      .to(
        ".testimonials-section .sec-title",
        {
          xPercent: 25,
        },
        "<"
      )
      .to(
        ".testimonials-section .third-title",
        {
          xPercent: -50,
        },
        "<"
      );

    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "10% top",
        end: "200% top",
        scrub: 1.5,
        pin: true,
      },
    });

    pinTl.from(".vd-card", {
      yPercent: 150,
      stagger: 0.2,
      ease: "power1.inOut",
    });
  });

  const handlePlay = (index, e) => {
    const video = vdRef.current[index];
    if (video) video.play();
    
    // Elevate and scale card using GSAP on hover
    gsap.to(e.currentTarget, {
      scale: 1.08,
      y: -16,
      zIndex: 30,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handlePause = (index, e) => {
    const video = vdRef.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0; // Reset to show the poster again
    }
    
    // Reset card state using GSAP on mouse leave
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      zIndex: 1,
      boxShadow: "0 0px 0px rgba(0, 0, 0, 0)",
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleCardClick = (cardName) => {
    const sectionMap = {
      "Kits Completos": "bunkeres",
      "Iluminación": "iluminacion",
      "Búnkeres": "bunkeres",
      "Armado de Suelo": "insumos",
      "Eats the worm Completo": "insumos",
      "Biología": "insumos",
      "Jiffy's": "bunkeres",
    };
    const sectionId = sectionMap[cardName];
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="enmiendas" className="testimonials-section">
      <div className="absolute size-full flex flex-col items-center pt-[5vw]">
        <h1 className="text-black first-title">Nuestros</h1>
        <h1 className="text-light-brown sec-title">productos</h1>
        <h1 className="text-black third-title">clave</h1>
      </div>

      <div className="pin-box">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`vd-card ${card.translation || ""} ${card.rotation || ""} relative group cursor-pointer`}
            onMouseEnter={(e) => handlePlay(index, e)}
            onMouseLeave={(e) => handlePause(index, e)}
            onClick={() => handleCardClick(card.name)}
          >
            <video
              ref={(el) => (vdRef.current[index] = el)}
              src={card.src}
              poster={card.img}
              playsInline
              muted
              loop
              className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Elegant overlay panel for Product Catalog */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <span className="text-xs uppercase tracking-widest text-[#faeade]/60 font-semibold mb-1">
                {card.category}
              </span>
              <h3 className="text-2xl font-bold text-[#faeade] tracking-wide uppercase leading-tight font-sans">
                {card.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
