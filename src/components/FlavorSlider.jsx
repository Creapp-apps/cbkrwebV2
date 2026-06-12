import { useGSAP } from "@gsap/react";
import { flavorlists } from "../constants";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const FlavorSlider = () => {
  const sliderRef = useRef();

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    const scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;

    if (!isTablet) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".flavor-section",
          start: "2% top",
          end: `+=${scrollAmount + 1500}px`,
          scrub: true,
          pin: true,
        },
      });

      tl.to([".slider-title-container", ".slider-content-container"], {
        x: `-${scrollAmount + 1500}px`,
        ease: "power1.inOut",
      }, 0);

      tl.to(".slider-section-bg-texture", {
        x: -250,
        ease: "power1.inOut",
      }, 0);
    }

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top top",
        end: "bottom 80%",
        scrub: true,
      },
    });

    titleTl
      .to(".first-text-split", {
        xPercent: -30,
        ease: "power1.inOut",
      })
      .to(
        ".flavor-text-scroll",
        {
          xPercent: -22,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".second-text-split",
        {
          xPercent: -10,
          ease: "power1.inOut",
        },
        "<"
      );
  });

  return (
    <div ref={sliderRef} className="slider-wrapper">
      <div className="flavors">
        {flavorlists.map((flavor) => (
          <div
            key={flavor.name}
            className="lg:w-[50vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none relative flex items-center justify-center overflow-visible"
          >
            {/* Rotated product card container */}
            <div className={`relative w-full h-full flex items-center justify-center z-20 ${flavor.rotation} cursor-pointer group transition-all duration-500 ease-out hover:scale-[1.03]`}>
              <img
                src={`${import.meta.env.BASE_URL}images/${flavor.color}-bg.svg`}
                alt=""
                className="absolute inset-0 w-full h-full object-fill select-none"
              />

              <img
                src={`${import.meta.env.BASE_URL}images/${flavor.color}-drink.png`}
                alt=""
                className="drinks z-10 select-none transition-all duration-500 ease-out group-hover:scale-[1.08] group-hover:-translate-y-3"
              />

              <h1 className="z-20 absolute md:bottom-10 md:left-10 bottom-5 left-5 text-milk md:text-6xl text-3xl font-semibold uppercase tracking-tighter">
                {flavor.name}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlavorSlider;
