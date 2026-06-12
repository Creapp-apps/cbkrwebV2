import FlavorTitle from "../components/FlavorTitle";
import FlavorSlider from "../components/FlavorSlider";

const FlavorSection = () => {
  return (
    <section id="bunkeres" className="flavor-section relative">
      {/* Single Section-wide Background Texture */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src={`${import.meta.env.BASE_URL}images/brown-elements.png`}
          alt=""
          className="absolute -top-[10%] -left-[10%] w-[120%] h-[120%] object-cover opacity-[0.07] select-none slider-section-bg-texture mix-blend-multiply"
        />
      </div>

      <div className="h-full flex lg:flex-row flex-col items-center relative z-10">
        <div className="lg:w-[57%] flex-none h-80 lg:h-full md:mt-20 xl:mt-0 slider-title-container">
          <FlavorTitle />
        </div>
        <div className="h-full slider-content-container">
          <FlavorSlider />
        </div>
      </div>
    </section>
  );
};

export default FlavorSection;
