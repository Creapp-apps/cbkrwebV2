import { useState, useEffect } from "react";
import { BookOpen, Info, LifeBuoy, Search, User, ShoppingCart, ChevronDown, Layers, Sprout, Sun, Droplet, Compass } from "lucide-react";

// Navigation links array custom tailored for CBKR
const navigationLinks = [
  { href: "hero", label: "Inicio" },
  {
    label: "Kits Living Soil",
    submenu: true,
    type: "description",
    items: [
      {
        description: "Búnkeres textiles de alta ingeniería para cultivo orgánico.",
        href: "bunkeres",
        icon: "Layers",
        label: "Búnkeres Textiles",
      },
      {
        description: "Nutrición viva y enmiendas biológicas premium para tu suelo.",
        href: "insumos",
        icon: "Sprout",
        label: "Nutrición Viva",
      },
      {
        description: "Sistemas LED avanzados y espectros optimizados.",
        href: "iluminacion",
        icon: "Sun",
        label: "Iluminación Pro",
      },
    ],
  },
  {
    label: "Materiales",
    submenu: true,
    type: "simple",
    items: [
      { href: "bunkeres", icon: "Layers", label: "Búnkeres Textiles" },
      { href: "iluminacion", icon: "Sun", label: "Iluminación" },
      { href: "insumos", icon: "Droplet", label: "Enmiendas Orgánicas" },
      { href: "cta", icon: "Compass", label: "Asesoramiento" },
    ],
  },
  {
    label: "Early Bird",
    submenu: true,
    type: "icon",
    items: [
      { href: "insumos", icon: "BookOpenIcon", label: "Early Bird Promo" },
      { href: "insumos", icon: "LifeBuoyIcon", label: "Guía de Living Soil" },
      { href: "cta", icon: "InfoIcon", label: "Sobre Nosotros" },
    ],
  },
];

const renderSubmenuIcon = (iconName) => {
  if (!iconName) return null;
  switch (iconName) {
    case "BookOpenIcon":
      return <BookOpen className="text-[#704e15] size-4 flex-shrink-0" />;
    case "LifeBuoyIcon":
      return <LifeBuoy className="text-[#704e15] size-4 flex-shrink-0" />;
    case "InfoIcon":
      return <Info className="text-[#704e15] size-4 flex-shrink-0" />;
    case "Layers":
      return <Layers className="text-[#704e15] size-4 flex-shrink-0" />;
    case "Sprout":
      return <Sprout className="text-[#704e15] size-4 flex-shrink-0" />;
    case "Sun":
      return <Sun className="text-[#704e15] size-4 flex-shrink-0" />;
    case "Droplet":
      return <Droplet className="text-[#704e15] size-4 flex-shrink-0" />;
    case "Compass":
      return <Compass className="text-[#704e15] size-4 flex-shrink-0" />;
    default:
      return null;
  }
};

const NavBar = ({ onLinkClick, activeLink }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // Scroll state tracker
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    if (onLinkClick) {
      onLinkClick(href);
    } else {
      const el = document.getElementById(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (e, label) => {
    e.stopPropagation();
    if (activeDropdown === label) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  };

  return (
    <header className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl backdrop-blur-md rounded-full z-50 border transition-all duration-300 px-4 md:px-6 ${
      isScrolled 
        ? "bg-[#fcfcfd]/95 border-[#704e15]/25 shadow-[0_10px_35px_rgba(112,78,21,0.15)] scale-[0.98]" 
        : "bg-[#fcfcfd]/85 border-[#1c2024]/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
    }`}>
      <div className="flex h-14 items-center justify-between gap-4">
        {/* Logo */}
        <a
          className="flex items-center gap-1.5 cursor-pointer select-none text-[#1c2024] hover:text-[#704e15] transition-colors flex-shrink-0"
          href="#hero"
          onClick={(e) => handleLinkClick(e, "hero")}
        >
          <svg className="w-5 h-5 text-[#704e15] transform rotate-[15deg] fill-current" viewBox="0 0 24 24">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
          <span className="font-serif text-lg font-bold tracking-widest text-[#1c2024]">cbkr.</span>
        </a>

        {/* Navigation menu (Desktop) */}
        <nav className="max-md:hidden flex-1 flex items-center justify-center gap-4 lg:gap-10 mx-6">
          {navigationLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {link.submenu ? (
                <>
                  <button
                    onClick={(e) => toggleDropdown(e, link.label)}
                    className="inline-flex items-center gap-1.5 bg-transparent text-[13px] md:text-[14px] uppercase tracking-wider font-extrabold text-[#1c2024]/80 hover:text-[#704e15] px-3.5 py-2 transition-colors cursor-pointer outline-none"
                  >
                    {link.label}
                    <ChevronDown className={`size-3 transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180" : ""}`} />
                  </button>

                  {/* Submenu Dropdown panel */}
                  {activeDropdown === link.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-2 border border-[#704e15]/20 bg-[#fcfcfd]/95 backdrop-blur-md rounded-2xl shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200">
                      <ul className={`grid gap-1 ${link.type === "description" ? "w-[380px] grid-cols-1" : "w-[200px]"}`}>
                        {link.items?.map((item) => (
                          <li key={item.label}>
                            <a
                              href={`#${item.href}`}
                              onClick={(e) => handleLinkClick(e, item.href)}
                              className="group block select-none rounded-xl p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-[#704e15]/5 hover:scale-[1.01]"
                            >
                              {/* Icon Submenu */}
                              {link.type === "icon" && (
                                <div className="flex items-center gap-2.5">
                                  {renderSubmenuIcon(item.icon)}
                                  <span className="font-serif text-[13px] font-semibold text-[#1c2024] group-hover:text-[#704e15] transition-colors">{item.label}</span>
                                </div>
                              )}

                              {/* Description Submenu */}
                              {link.type === "description" && (
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2.5">
                                    {renderSubmenuIcon(item.icon)}
                                    <div className="font-serif text-[13px] font-semibold text-[#1c2024] group-hover:text-[#704e15] transition-colors">{item.label}</div>
                                  </div>
                                  <p className="text-[#1c2024]/60 text-xs leading-normal font-sans group-hover:text-[#1c2024]/80 transition-colors">
                                    {item.description}
                                  </p>
                                </div>
                              )}

                              {/* Simple Submenu */}
                              {link.type === "simple" && (
                                <div className="flex items-center gap-2.5">
                                  {renderSubmenuIcon(item.icon)}
                                  <span className="font-serif text-[13px] font-semibold text-[#1c2024] group-hover:text-[#704e15] transition-colors">{item.label}</span>
                                </div>
                              )}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <a
                  className={`px-3.5 py-2 text-[13px] md:text-[14px] uppercase tracking-wider font-extrabold transition-colors cursor-pointer select-none relative flex flex-col items-center justify-center ${
                    activeLink === link.href ? "text-[#704e15]" : "text-[#1c2024]/80 hover:text-[#704e15]"
                  }`}
                  href={`#${link.href || ""}`}
                  onClick={(e) => handleLinkClick(e, link.href || "")}
                >
                  {link.label}
                  {activeLink === link.href && (
                    <span className="absolute -bottom-1 w-1.5 h-1.5 bg-[#704e15] rounded-full animate-fade-in" />
                  )}
                </a>
              )}
            </div>
          ))}
        </nav>

        {/* Right side Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Prominent Shop CTA Button */}
          <a
            href="#bunkeres"
            onClick={(e) => handleLinkClick(e, "bunkeres")}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs uppercase tracking-widest font-extrabold text-[#faeade] bg-[#704e15] hover:bg-[#52390f] rounded-full shadow-[0_4px_12px_rgba(112,78,21,0.2)] hover:shadow-[0_6px_16px_rgba(112,78,21,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer mr-1"
          >
            Comprar Ahora
          </a>

          <button
            onClick={() => alert("Buscar productos")}
            className="p-2 text-[#1c2024]/70 hover:text-[#704e15] transition-colors rounded-full size-8 cursor-pointer flex items-center justify-center hover:bg-[#1c2024]/5"
          >
            <Search className="size-4" />
          </button>
          <button
            onClick={() => alert("Acceder a tu cuenta")}
            className="p-2 text-[#1c2024]/70 hover:text-[#704e15] transition-colors rounded-full size-8 cursor-pointer flex items-center justify-center hover:bg-[#1c2024]/5"
          >
            <User className="size-4" />
          </button>
          <button
            onClick={(e) => handleLinkClick(e, "bunkeres")}
            className="relative p-2 text-[#1c2024]/70 hover:text-[#704e15] transition-colors rounded-full size-8 cursor-pointer flex items-center justify-center hover:bg-[#1c2024]/5"
          >
            <ShoppingCart className="size-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#704e15] rounded-full" />
          </button>

          {/* Mobile Popover Menu Button */}
          <button
            className="group size-8 md:hidden p-2 text-[#1c2024] hover:text-[#704e15] transition-colors rounded-full cursor-pointer flex items-center justify-center hover:bg-[#1c2024]/5"
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
          >
            <svg
              className="pointer-events-none"
              fill="none"
              height={16}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width={16}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={`origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] ${isMobileMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-[5px]"}`}
                d="M4 12L20 12"
              />
              <path
                className={`origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] ${isMobileMenuOpen ? "opacity-0" : ""}`}
                d="M4 12H20"
              />
              <path
                className={`origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] ${isMobileMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-[5px]"}`}
                d="M4 12H20"
              />
            </svg>
          </button>

          {/* Mobile Menu Popover Panel */}
          {isMobileMenuOpen && (
            <div 
              className="absolute top-full right-4 w-64 p-2 md:hidden border border-[#704e15]/20 bg-[#fcfcfd]/95 backdrop-blur-md rounded-2xl shadow-xl mt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="flex flex-col gap-1">
                {/* Mobile Shop CTA */}
                <li className="w-full pb-2 mb-2 border-b border-[#1c2024]/5">
                  <a
                    href="#bunkeres"
                    onClick={(e) => handleLinkClick(e, "bunkeres")}
                    className="flex items-center justify-center w-full py-2.5 text-xs uppercase tracking-widest font-extrabold text-[#faeade] bg-[#704e15] rounded-xl text-center shadow-sm"
                  >
                    Comprar Ahora
                  </a>
                </li>
                {navigationLinks.map((link) => (
                  <li key={link.label} className="w-full">
                    {link.submenu ? (
                      <div className="space-y-1.5 p-2">
                        <div className="text-[10px] uppercase tracking-widest font-bold text-[#1c2024]/40">
                          {link.label}
                        </div>
                        <ul className="pl-2 space-y-1 border-l border-[#1c2024]/5">
                          {link.items?.map((item) => (
                            <li key={item.label}>
                              <a
                                href={`#${item.href}`}
                                onClick={(e) => handleLinkClick(e, item.href)}
                                className="block py-1 text-xs text-[#1c2024]/70 hover:text-[#704e15] font-serif transition-colors"
                              >
                                {item.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <a
                        href={`#${link.href || ""}`}
                        onClick={(e) => handleLinkClick(e, link.href || "")}
                        className={`block p-2 text-xs uppercase tracking-widest font-bold rounded-lg transition-colors hover:bg-[#1c2024]/5 ${
                          activeLink === link.href ? "text-[#704e15]" : "text-[#1c2024]/70 hover:text-[#704e15]"
                        }`}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
