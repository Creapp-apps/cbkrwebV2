const base = import.meta.env.BASE_URL;

const flavorlists = [
  {
    name: "Kits Completos",
    color: "brown",
    rotation: "md:rotate-[-8deg] rotate-0",
  },
  {
    name: "Iluminación",
    color: "red",
    rotation: "md:rotate-[8deg] rotate-0",
  },
  {
    name: "Búnkeres",
    color: "blue",
    rotation: "md:rotate-[-8deg] rotate-0",
  },
  {
    name: "Armado de Suelo",
    color: "orange",
    rotation: "md:rotate-[8deg] rotate-0",
  },
  {
    name: "Biología",
    color: "white",
    rotation: "md:rotate-[-8deg] rotate-0",
  },
  {
    name: "Jiffy's",
    color: "black",
    rotation: "md:rotate-[8deg] rotate-0",
  },
];

const nutrientLists = [
  { label: "Materia Orgánica", amount: "85%" },
  { label: "Nitrógeno Orgánico", amount: "2.5%" },
  { label: "Fósforo Asimilable", amount: "1.8%" },
  { label: "Potasio Disponible", amount: "2.0%" },
  { label: "Calcio Activo", amount: "3.5%" },
];

const cards = [
  {
    src: `${base}videos/cbkr1.mp4`,
    rotation: "rotate-z-[-10deg]",
    name: "Kits Completos",
    category: "Cultivo Orgánico",
    img: `${base}images/p1.png`,
    translation: "translate-y-[-5%]",
  },
  {
    src: `${base}videos/cbkr2.mp4`,
    rotation: "rotate-z-[4deg]",
    name: "Iluminación",
    category: "Iluminación",
    img: `${base}images/p2.png`,
  },
  {
    src: `${base}videos/cbkr3.mp4`,
    rotation: "rotate-z-[-4deg]",
    name: "Búnkeres",
    category: "Eats the worm",
    img: `${base}images/p3.png`,
    translation: "translate-y-[-5%]",
  },
  {
    src: `${base}videos/cbkr4.mp4`,
    rotation: "rotate-z-[4deg]",
    name: "Armado de Suelo",
    category: "Nutrición",
    img: `${base}images/p4.png`,
    translation: "translate-y-[5%]",
  },
  {
    src: `${base}videos/cbkr7.mp4`,
    rotation: "rotate-z-[-10deg]",
    name: "Eats the worm Completo",
    category: "Bunker Setups",
    img: `${base}images/p5.png`,
  },
  {
    src: `${base}videos/cbkr1.mp4`,
    rotation: "rotate-z-[4deg]",
    name: "Biología",
    category: "Biodiversidad",
    img: `${base}images/p6.png`,
    translation: "translate-y-[5%]",
  },
  {
    src: `${base}videos/cbkr3.mp4`,
    rotation: "rotate-z-[-3deg]",
    name: "Jiffy's",
    category: "Biología Activa",
    img: `${base}images/p7.png`,
    translation: "translate-y-[10%]",
  },
];

export { flavorlists, nutrientLists, cards };
