import { useMediaQuery } from "react-responsive";
import { nutrientLists } from "../constants";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(SplitText);

const NutritionSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const [activeSpot, setActiveSpot] = useState(null);

  const hotspots = [
    {
      id: "light",
      top: "32%",
      left: "50%",
      title: "Iluminación Profesional",
      description: "Panel LED FoliageLight Pro de alta eficiencia con espectro completo optimizado para un crecimiento vigoroso y floración abundante.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-[#513022]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.978 4.978l1.591 1.591m10.862 10.862l1.591 1.591M3 12h2.25m13.5 0H21M4.978 19.022l1.591-1.591m10.862-10.862l1.591-1.591M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
        </svg>
      )
    },
    {
      id: "bed",
      top: "70%",
      left: "38%",
      title: "Búnker de Cultivo",
      description: "Maceta de tela Gro-Bed de alta aireación. Previene el estrangulamiento de raíces y promueve una poda radicular natural por aire.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-[#513022]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      )
    },
    {
      id: "biology",
      top: "54%",
      left: "62%",
      title: "Living Soil & Biología",
      description: "Sustrato vivo orgánico de alta calidad que simula los ciclos naturales de la tierra para una nutrición constante sin químicos.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-[#513022]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925-3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
        </svg>
      )
    }
  ];

  useGSAP((self) => {
    document.fonts.ready.then(() => {
      self.add(() => {
        const titleSplit = SplitText.create(".nutrition-title", {
          type: "chars",
        });
        const paragraphSplit = SplitText.create(".nutrition-section p", {
          type: "words, lines",
          linesClass: "paragraph-line",
        });

        const contentTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".nutrition-section",
            start: "top center",
          },
        });
        contentTl
          .from(titleSplit.chars, {
            yPercent: 100,
            stagger: 0.02,
            ease: "power2.out",
          })
          .from(paragraphSplit.words, {
            yPercent: 300,
            rotate: 3,
            ease: "power1.inOut",
            duration: 1,
            stagger: 0.01,
          });

        const titleTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".nutrition-section",
            start: "top 80%",
          },
        });

        titleTl.to(".nutrition-text-scroll", {
          duration: 1,
          opacity: 1,
          clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
          ease: "power1.inOut",
        });

        // Parallax background texture
        gsap.to(".nutrition-bg-texture", {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: ".nutrition-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });
  });

  const leftNutrients = nutrientLists.slice(0, 2);
  const rightNutrients = nutrientLists.slice(2, 5);

  return (
    <section id="insumos" className="nutrition-section relative overflow-hidden">
      {/* Background Parallax Texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img
          src={`${import.meta.env.BASE_URL}images/white-elements.png`}
          alt=""
          className="absolute -top-[10%] -left-[10%] w-[120%] h-[120%] object-cover opacity-[0.08] select-none nutrition-bg-texture mix-blend-multiply"
        />
      </div>

      <img
        src={`${import.meta.env.BASE_URL}images/slider-dip.png`}
        alt=""
        className="w-full object-cover relative z-10"
      />

      {/* 3D-like Interactive Hotspot Showcase Container */}
      <div className="big-img-container z-10">
        <img
          src={`${import.meta.env.BASE_URL}images/grow-bunker-setup.png`}
          alt="Grow Bunker Setup"
          className="big-img select-none"
        />

        {/* Hotspots */}
        {hotspots.map((spot) => (
          <div
            key={spot.id}
            style={{ top: spot.top, left: spot.left }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            onMouseEnter={() => !isMobile && setActiveSpot(spot.id)}
            onMouseLeave={() => !isMobile && setActiveSpot(null)}
          >
            {/* Pulsing Hotspot Trigger */}
            <button
              onClick={() => isMobile && setActiveSpot(activeSpot === spot.id ? null : spot.id)}
              className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/95 shadow-lg border border-[#BC7953]/20 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              {/* Outer pulsing ring */}
              <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
              {/* Hotspot Icon */}
              {spot.icon}
            </button>

            {/* Hotspot Info Tooltip */}
            <div
              className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-4 rounded-2xl bg-[#fdebd2]/95 backdrop-blur-md border border-[#513022]/10 shadow-2xl transition-all duration-300 origin-bottom ${
                activeSpot === spot.id
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 translate-y-2 pointer-events-none"
              }`}
            >
              {/* Tooltip Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#fdebd2]/95" />
              
              <h3 className="text-[#513022] font-bold text-sm leading-tight uppercase tracking-tight">
                {spot.title}
              </h3>
              <p className="text-[#513022]/85 font-paragraph text-xs mt-1 leading-relaxed">
                {spot.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Nutrition Cards - Left Side */}
      <div className="hidden md:flex absolute left-8 lg:left-14 xl:left-24 bottom-24 flex-col gap-6 z-20">
        {leftNutrients.map((nutrient, idx) => (
          <div
            key={idx}
            className="bg-[#fdebd2]/90 hover:bg-[#fdebd2] hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-out border border-[#513022]/10 rounded-2xl p-5 w-56 shadow-lg cursor-pointer transform hover:-translate-y-1 animate-float"
            style={{ animationDelay: `${idx * 1.5}s` }}
          >
            <span className="text-[#513022]/70 text-xs font-semibold uppercase tracking-wider block">
              {nutrient.label}
            </span>
            <span className="text-xs text-[#865720] mt-1 block">hasta un</span>
            <span className="text-3xl font-bold text-[#513022] leading-none tracking-tight block">
              {nutrient.amount}
            </span>
          </div>
        ))}
      </div>

      {/* Desktop Nutrition Cards - Right Side */}
      <div className="hidden md:flex absolute right-8 lg:right-14 xl:right-24 bottom-24 flex-col gap-6 z-20">
        {rightNutrients.map((nutrient, idx) => (
          <div
            key={idx}
            className="bg-[#fdebd2]/90 hover:bg-[#fdebd2] hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-out border border-[#513022]/10 rounded-2xl p-5 w-56 shadow-lg cursor-pointer transform hover:-translate-y-1 animate-float"
            style={{ animationDelay: `${(idx + 2) * 1.5}s` }}
          >
            <span className="text-[#513022]/70 text-xs font-semibold uppercase tracking-wider block">
              {nutrient.label}
            </span>
            <span className="text-xs text-[#865720] mt-1 block">hasta un</span>
            <span className="text-3xl font-bold text-[#513022] leading-none tracking-tight block">
              {nutrient.amount}
            </span>
          </div>
        ))}
      </div>

      <div className="flex md:flex-row flex-col justify-between md:px-10 px-5 mt-14 md:mt-0 relative z-10 pointer-events-none">
        <div className="relative inline-block md:translate-y-20 pointer-events-auto">
          <div className="general-title relative flex flex-col justify-center items-center gap-24">
            <div className="overflow-hidden place-self-start">
              <h1 className="nutrition-title">Tu cultivo</h1>
            </div>
            <div
              style={{
                clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
              }}
              className="nutrition-text-scroll place-self-start"
            >
              <div className="bg-yellow-brown pb-5 md:pt-0 pt-3 md:px-5 px-3">
                <h2 className="text-milk-yellow">Al Máximo</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:justify-center items-center translate-y-5 pointer-events-auto">
          <div className="md:max-w-xs max-w-md">
            <p className="text-lg md:text-right text-balance font-paragraph">
              Eats the worm provee todos los macro y micronutrientes que tus plantas necesitan, 
              en la forma y el momento exactos que los solicitan, aumentando la producción 
              de terpenos y resinas de forma orgánica.
            </p>
          </div>
        </div>

        {/* Mobile Nutrition Box */}
        <div className="nutrition-box pointer-events-auto">
          <div className="list-wrapper">
            {nutrientLists.map((nutrient, index) => (
              <div key={index} className="relative flex-1 min-w-[120px] col-center py-2">
                <div>
                  <p className="text-xs font-paragraph text-[#513022]/75">{nutrient.label}</p>
                  <p className="text-xl tracking-tighter font-bold text-[#513022]">
                    {nutrient.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NutritionSection;
