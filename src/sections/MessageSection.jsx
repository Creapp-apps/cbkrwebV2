import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);

const MessageSection = () => {
  useGSAP((self) => {
    let cleanupListeners;
    document.fonts.ready.then(() => {
      self.add(() => {
        const firstMsgSplit = SplitText.create(".first-message", {
          type: "words, chars",
        });
        const secMsgSplit = SplitText.create(".second-message", {
          type: "words, chars",
        });
        const highlightMsgSplit = SplitText.create(".highlight-message", {
          type: "words, chars",
        });
        const paragraphSplit = SplitText.create(".message-content p", {
          type: "words, lines",
          linesClass: "paragraph-line",
        });

        gsap.to(firstMsgSplit.words, {
          color: "#faeade",
          ease: "power1.in",
          stagger: 1,
          scrollTrigger: {
            trigger: ".message-content",
            start: "top center",
            end: "30% center",
            scrub: true,
          },
        });
        gsap.to(secMsgSplit.words, {
          color: "#faeade",
          ease: "power1.in",
          stagger: 1,
          scrollTrigger: {
            trigger: ".second-message",
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        });

        const revealTl = gsap.timeline({
          delay: 1,
          scrollTrigger: {
            trigger: ".msg-text-scroll",
            start: "top 60%",
          },
        });
        revealTl.to(".msg-text-scroll", {
          duration: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "circ.inOut",
        });

        const paragraphTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".message-content p",
            start: "top center",
          },
        });
        paragraphTl.from(paragraphSplit.words, {
          yPercent: 300,
          rotate: 3,
          ease: "power1.inOut",
          duration: 1,
          stagger: 0.01,
        });

        // Interactive mouse movement physics
        const allMsgChars = [
          ...firstMsgSplit.chars,
          ...secMsgSplit.chars,
          ...highlightMsgSplit.chars
        ];

        const handleMouseMove = (e) => {
          const mouseX = e.clientX;
          const mouseY = e.clientY;

          allMsgChars.forEach((char) => {
            const rect = char.getBoundingClientRect();
            const charX = rect.left + rect.width / 2;
            const charY = rect.top + rect.height / 2;

            const dx = mouseX - charX;
            const dy = mouseY - charY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 110; // radius of influence in px

            if (distance < maxDist) {
              const force = (maxDist - distance) / maxDist;
              const angle = Math.atan2(dy, dx);

              // Smooth repulsion vectors
              const pushX = -Math.cos(angle) * force * 24;
              const pushY = -Math.sin(angle) * force * 18;
              const rot = -dx * force * 0.12;
              const scale = 1 + force * 0.18;

              gsap.to(char, {
                x: pushX,
                y: pushY,
                rotate: rot,
                scale: scale,
                duration: 0.35,
                ease: "power2.out",
                overwrite: "auto",
              });
            } else {
              // Return smoothly with elastic effect
              gsap.to(char, {
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                duration: 0.7,
                ease: "elastic.out(1.2, 0.4)",
                overwrite: "auto",
              });
            }
          });
        };

        const handleMouseLeave = () => {
          allMsgChars.forEach((char) => {
            gsap.to(char, {
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              duration: 0.8,
              ease: "elastic.out(1.2, 0.4)",
              overwrite: "auto",
            });
          });
        };

        const sectionEl = document.querySelector(".message-content");
        if (sectionEl) {
          sectionEl.addEventListener("mousemove", handleMouseMove);
          sectionEl.addEventListener("mouseleave", handleMouseLeave);
          cleanupListeners = () => {
            sectionEl.removeEventListener("mousemove", handleMouseMove);
            sectionEl.removeEventListener("mouseleave", handleMouseLeave);
          };
        }
      });
    });

    return () => {
      if (cleanupListeners) cleanupListeners();
    };
  });

  return (
    <section className="message-content">
      <div className="container mx-auto flex-center px-6 md:py-28 py-16 relative">
        <div className="w-full h-full">
          <div className="msg-wrapper">
            <h1 className="first-message">Aprovecha la temporada</h1>

            <div
              style={{
                clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
              }}
              className="msg-text-scroll"
            >
              <div className="bg-light-brown md:pb-5 pb-3 px-5">
                <h2 className="text-red-brown highlight-message">EARLY BIRDS</h2>
              </div>
            </div>

            <h1 className="second-message">
              para armar tu suelo vivo
            </h1>
          </div>

          <div className="flex-center md:mt-20 mt-10">
            <div className="max-w-md px-10 flex-center overflow-hidden">
              <p>
                Los primeros dias del mes, la tienda tendra unos descuentos enormes aplicados, 
                cada 5 dias, te encontraras con distintos descuentos y ofertas, a veces mejores, a veces peores...
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageSection;
