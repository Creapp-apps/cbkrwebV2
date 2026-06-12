import { useGSAP } from "@gsap/react";
import ClipPathTitle from "../components/ClipPathTitle";
import gsap from "gsap";
import VideoPinSection from "../components/VideoPinSection";

const BenefitSection = () => {
  useGSAP(() => {
    const revealTl = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: ".benefit-section",
        start: "top 60%",
        end: "top top",
        scrub: 1.5,
      },
    });

    revealTl
      .to(".benefit-section .first-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .second-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .third-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .fourth-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      });

    // Parallax background texture
    gsap.to(".benefit-bg-texture", {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: ".benefit-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  return (
    <section id="iluminacion" className="benefit-section relative overflow-hidden">
      {/* Background Parallax Texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img
          src={`${import.meta.env.BASE_URL}images/black-elements.png`}
          alt=""
          className="absolute -top-[10%] -left-[10%] w-[120%] h-[120%] object-cover opacity-[0.10] select-none benefit-bg-texture invert mix-blend-screen"
        />
      </div>

      <div className="container mx-auto pt-20 relative z-10">
        <div className="col-center">
          <p className="text-center">
            Descubri los beneficios clave de cultivar en suelo vivo
          </p>

          <div className="mt-20 col-center">
            <ClipPathTitle
              title={"Más Terpenos"}
              color={"#faeade"}
              bg={"#c88e64"}
              className={"first-title"}
              borderColor={"#222123"}
            />
            <ClipPathTitle
              title={"Mayor Aroma y Sabor"}
              color={"#222123"}
              bg={"#faeade"}
              className={"second-title"}
              borderColor={"#222123"}
            />
            <ClipPathTitle
              title={"Nutrición 100% Natural"}
              color={"#faeade"}
              bg={"#7F3B2D"}
              className={"third-title"}
              borderColor={"#222123"}
            />
            <ClipPathTitle
              title={"Sin Químicos Sintéticos"}
              color={"#2E2D2F"}
              bg={"#FED775"}
              className={"fourth-title"}
              borderColor={"#222123"}
            />
          </div>

          <div className="md:mt-0 mt-10">
            <p>Esto es CBKR</p>
          </div>
        </div>
      </div>

      <div className="relative overlay-box z-10">
        <VideoPinSection />
      </div>
    </section>
  );
};

export default BenefitSection;
