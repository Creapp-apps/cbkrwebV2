import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);

const FooterSection = () => {
  const footerRef = useRef(null);

  useGSAP((self) => {
    document.fonts.ready.then(() => {
      self.add(() => {
        const titleSplit = SplitText.create(".footer-title", {
          type: "chars",
        });

        const chars = titleSplit.chars;

        const handleMouseMove = (e) => {
          const mouseX = e.clientX;
          const mouseY = e.clientY;

          chars.forEach((char) => {
            const rect = char.getBoundingClientRect();
            const charX = rect.left + rect.width / 2;
            const charY = rect.top + rect.height / 2;

            const dx = mouseX - charX;
            const dy = mouseY - charY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 120; // radius of influence in px

            if (distance < maxDist) {
              const force = (maxDist - distance) / maxDist;
              const angle = Math.atan2(dy, dx);

              // Repulsion vector math
              const pushX = -Math.cos(angle) * force * 24;
              const pushY = -Math.sin(angle) * force * 18;
              const rot = -dx * force * 0.12;
              const scale = 1 + force * 0.22;

              gsap.to(char, {
                x: pushX,
                y: pushY,
                rotate: rot,
                scale: scale,
                color: "#FED775", // Brand yellow highlights on hover repulsion
                duration: 0.35,
                ease: "power2.out",
                overwrite: "auto",
              });
            } else {
              // Return to normal color and position
              gsap.to(char, {
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                color: "#faeade",
                duration: 0.7,
                ease: "elastic.out(1.2, 0.4)",
                overwrite: "auto",
              });
            }
          });
        };

        const handleMouseLeave = () => {
          chars.forEach((char) => {
            gsap.to(char, {
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              color: "#faeade",
              duration: 0.8,
              ease: "elastic.out(1.2, 0.4)",
              overwrite: "auto",
            });
          });
        };

        const container = footerRef.current;
        if (container) {
          container.addEventListener("mousemove", handleMouseMove);
          container.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
          if (container) {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
          }
        };
      });
    });
  });

  return (
    <section id="cta" className="footer-section">
      <img
        src={`${import.meta.env.BASE_URL}images/footer-dip.png`}
        alt=""
        className="w-full object-cover -translate-y-1"
      />

      <div ref={footerRef} className="relative md:pt-[10vh] pt-[5vh] pb-12 flex flex-col items-center justify-start overflow-hidden">
        <div className="overflow-hidden z-10 w-full">
          <h1 className="general-title footer-title text-center text-milk py-5 cursor-default select-none">
            #earlybird
          </h1>
        </div>

        <div className="flex-center gap-5 relative z-10 md:mt-12 mt-5">
          <div className="social-btn">
            <img src={`${import.meta.env.BASE_URL}images/yt.svg`} alt="" />
          </div>
          <div className="social-btn">
            <img src={`${import.meta.env.BASE_URL}images/insta.svg`} alt="" />
          </div>
          <div className="social-btn">
            <img src={`${import.meta.env.BASE_URL}images/tiktok.svg`} alt="" />
          </div>
        </div>

        <div className="mt-24 md:px-10 px-5 w-full flex gap-10 md:flex-row flex-col justify-between text-milk font-paragraph md:text-lg font-medium relative z-10">
          <div className="flex items-center md:gap-16 gap-5">
            <div>
              <p>Productos CBKR</p>
            </div>
            <div>
              <p>Early Bird</p>
              <p>Eats the worm</p>
              <p>Nutrición Orgánica</p>
            </div>
            <div>
              <p>Nosotros</p>
              <p>Contacto</p>
              <p>Blog</p>
            </div>
          </div>

          <div className="md:max-w-lg">
            <p>
              ¡Recibí acceso anticipado exclusivo, novedades sobre productos, eventos y más!
            </p>
            <div className="flex justify-between items-center border-b border-[#D9D9D9] py-5 md:mt-10">
              <input
                type="email"
                placeholder="Ingresá tu correo"
                className="w-full placeholder:font-sans placeholder:text-[#999999]"
              />
              <img src={`${import.meta.env.BASE_URL}images/arrow.svg`} alt="arrow" />
            </div>
          </div>
        </div>

        <div className="copyright-box relative z-10">
          <p>Copyright © 2026 CBKR - Todos los derechos reservados</p>
          <div className="flex items-center gap-7">
            <p>Política de Privacidad</p>
            <p>Términos de Servicio</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
