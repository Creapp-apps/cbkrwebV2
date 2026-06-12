import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(SplitText);

const HeroSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP((self) => {
    let cleanupListeners;
    document.fonts.ready.then(() => {
      self.add(() => {
        const titleSplit = SplitText.create(".hero-title", {
          type: "chars",
        });
        const subtitleSplit = SplitText.create(".hero-subtitle h1", {
          type: "chars",
        });

        const tl = gsap.timeline({
          delay: 1,
        });

        tl.to(".hero-content", {
          opacity: 1,
          y: 0,
          ease: "power1.inOut",
        })
          .to(
            ".hero-text-scroll",
            {
              duration: 1,
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              ease: "circ.out",
            },
            "-=0.5"
          )
          .from(
            titleSplit.chars,
            {
              yPercent: 200,
              stagger: 0.02,
              ease: "power2.out",
            },
            "-=0.5"
          );

        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero-container",
            start: "1% top",
            end: "bottom top",
            scrub: true,
          },
        });
        heroTl.to(".hero-container", {
          rotate: 7,
          scale: 0.9,
          yPercent: 30,
          ease: "power1.inOut",
        });

        // Interactive magnetic repulsion/tilt effect on mousemove
        const allChars = [...titleSplit.chars, ...subtitleSplit.chars];

        const handleMouseMove = (e) => {
          const mouseX = e.clientX;
          const mouseY = e.clientY;

          allChars.forEach((char) => {
            const rect = char.getBoundingClientRect();
            const charX = rect.left + rect.width / 2;
            const charY = rect.top + rect.height / 2;

            const dx = mouseX - charX;
            const dy = mouseY - charY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 120; // radius of mouse influence in pixels

            if (distance < maxDist) {
              const force = (maxDist - distance) / maxDist; // 0 (far) to 1 (close)
              const angle = Math.atan2(dy, dx);

              // Push character away from mouse
              const pushX = -Math.cos(angle) * force * 28;
              const pushY = -Math.sin(angle) * force * 24;
              const rot = -dx * force * 0.15;
              const scale = 1 + force * 0.25;

              // Determine hover vs normal color
              const isSubtitle = subtitleSplit.chars.includes(char);
              const hoverColor = isSubtitle ? "#ffffff" : "#7f3b2d";

              gsap.to(char, {
                x: pushX,
                y: pushY,
                rotate: rot,
                scale: scale,
                color: hoverColor,
                duration: 0.3,
                ease: "power2.out",
                overwrite: "auto",
              });
            } else {
              // Return smoothly with spring bounce
              const isSubtitle = subtitleSplit.chars.includes(char);
              const normalColor = isSubtitle ? "#fce1cd" : "#523122";

              gsap.to(char, {
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                color: normalColor,
                duration: 0.6,
                ease: "elastic.out(1.2, 0.4)",
                overwrite: "auto",
              });
            }
          });
        };

        const handleMouseLeave = () => {
          allChars.forEach((char) => {
            const isSubtitle = subtitleSplit.chars.includes(char);
            const normalColor = isSubtitle ? "#fce1cd" : "#523122";

            gsap.to(char, {
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              color: normalColor,
              duration: 0.8,
              ease: "elastic.out(1.2, 0.3)",
              overwrite: "auto",
            });
          });
        };

        const container = document.querySelector(".hero-container");
        if (container) {
          container.addEventListener("mousemove", handleMouseMove);
          container.addEventListener("mouseleave", handleMouseLeave);
          cleanupListeners = () => {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
          };
        }
      });
    });

    return () => {
      if (cleanupListeners) cleanupListeners();
    };
  });

  return (
    <section id="hero" className="bg-main-bg">
      <div className="hero-container">
        {isTablet ? (
          <>
            {isMobile && (
              <img
                src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
                className="absolute bottom-40 size-full object-cover"
              />
            )}
            <img
              src={`${import.meta.env.BASE_URL}images/hero-img.png`}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 object-auto"
            />
          </>
        ) : (
          <video
            src={`${import.meta.env.BASE_URL}videos/hero-bg.mp4`}
            autoPlay
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="hero-content opacity-0">
          <div className="overflow-hidden">
            <h1 className="hero-title">Eats the worm</h1>
          </div>
          <div
            style={{
              clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
            }}
            className="hero-text-scroll"
          >
            <div className="hero-subtitle">
              <h1>Early Bird</h1>
            </div>
          </div>

          <h2 className="!text-white font-medium">
            Aprovecha a comprar temprano, que luego los descuentos desaparecerán.
          </h2>

          <div className="hero-button">
            <p>CONOCER MÁS</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
