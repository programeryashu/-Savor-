import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
  name: string;
  price: string;
  description: string;
}

interface MenuData {
  [category: string]: MenuItem[];
}

const MENU_DATA: MenuData = {
  appetizers: [
    {
      name: "Wagyu Tartare",
      price: "₹42",
      description: "A5 Wagyu beef, cured egg yolk, caper leaves, served with toasted brioche points.",
    },
    {
      name: "Heirloom Tomato Consommé",
      price: "₹28",
      description: "Clarified tomato essence, basil oil, and delicate summer vegetable pearls.",
    },
    {
      name: "Oysters on the Half Shell",
      price: "₹36",
      description: "Fresh Kumamoto oysters, champagne mignonette, finger lime caviar.",
    },
  ],
  entrees: [
    {
      name: "Diver Scallop & Truffle",
      price: "₹58",
      description: "Hand-harvested scallops, black winter truffle emulsion, parsnip purée, and delicate sea herbs.",
    },
    {
      name: "A5 Wagyu & Wild Mushrooms",
      price: "₹95",
      description: "Japanese Wagyu beef, foraged wild mushrooms, smoked potato mille-feuille, rich bordelaise.",
    },
    {
      name: "Chilean Sea Bass",
      price: "₹64",
      description: "Pan-roasted sea bass, saffron-infused lobster broth, braised fennel, sea beans.",
    },
  ],
  desserts: [
    {
      name: "Golden Chocolate Sphere",
      price: "₹24",
      description: "Grand Cru dark chocolate sphere, warm salted caramel pour-over, hazelnut praline, edible gold leaf.",
    },
    {
      name: "Citrus Infusion",
      price: "₹18",
      description: "Meyer lemon curd, yuzu sorbet, meringue shards, micro mint.",
    },
    {
      name: "Soufflé au Grand Marnier",
      price: "₹22",
      description: "Classic hot orange liqueur soufflé, Tahitian vanilla bean crème anglaise.",
    },
  ],
  "wine-list": [
    {
      name: "Dom Pérignon Brut",
      price: "₹75 / ₹360",
      description: "Vintage Champagne, France. Notes of white flowers, stone fruit, and toasted brioche.",
    },
    {
      name: "Opus One",
      price: "₹120 / ₹580",
      description: "Cabernet Sauvignon Blend, Napa Valley, USA. Rich dark fruit, espresso, and velvety tannins.",
    },
    {
      name: "Château d'Yquem",
      price: "₹90 / ₹420",
      description: "Sauternes, Bordeaux, France. Honeyed apricot, ginger, and perfectly balanced acidity.",
    },
  ],
};

const CATEGORIES = [
  { id: "appetizers", label: "Appetizers" },
  { id: "entrees", label: "Entrées" },
  { id: "desserts", label: "Desserts" },
  { id: "wine-list", label: "Wine List" },
];

export const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("appetizers");

  return (
    <div className="w-full pt-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-32">
      {/* Hero Section */}
      <section className="mb-16 md:mb-24 pt-12 md:pt-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl md:text-6xl text-secondary mb-4 drop-shadow-lg"
        >
          Seasonal Curations
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-sans text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto opacity-80"
        >
          An exploration of earth and ocean, crafted with intention and presented with quiet reverence.
        </motion.p>
      </section>

      {/* Category Navigation (Sticky) */}
      <div className="sticky top-[64px] md:top-[80px] z-40 bg-background/80 backdrop-blur-md py-4 mb-12 border-b border-white/5">
        <nav className="flex overflow-x-auto no-scrollbar gap-8 whitespace-nowrap justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`font-sans text-sm tracking-widest uppercase pb-2 px-1 border-b-2 cursor-pointer transition-all duration-300 ${
                activeCategory === cat.id
                  ? "text-secondary border-secondary font-semibold"
                  : "text-on-surface-variant border-transparent hover:text-on-surface"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Featured Card (Spotlight) */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mb-24"
      >
        <div className="glass-panel rounded-xl overflow-hidden relative group gold-border-subtle cursor-pointer">
          <div className="h-64 md:h-96 w-full relative">
            <img
              className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              alt="Diver Scallop"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqzYJyYFRUJ0r3bVRudDD9YgZZCJnOKPUrYfZYmT1Fu_JVS_gZOTvf41YEa5F5Ux_vZJ4ZLbDQAXWs6qlJm39F1yAFXsF2nHlJqxUG8Qbz6kj35J2I6NWEtU893aMQ8ks6Dj3gC9j777P77OpHHF3EU_vbFpdH6kjcHB4fX0l_2ffK3G0P3nSq5NTyFVeVsFJ30vF9qWEKlrC8fq_lJJo1DWydzaYXWWBxq1M4ajWKmVbYhTMBLfAK"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
            <div className="uppercase font-sans text-[10px] font-bold text-secondary tracking-[0.2em] mb-2">
              Chef's Signature
            </div>
            <h3 className="font-serif text-3xl md:text-5xl text-on-surface mb-2">Diver Scallop &amp; Truffle</h3>
            <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-xl hidden md:block opacity-90">
              Hand-harvested scallops, black winter truffle emulsion, parsnip purée, and delicate sea herbs.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Menu List */}
      <section className="scroll-mt-32 max-w-4xl mx-auto">
        <h3 className="font-serif text-3xl text-secondary mb-12 border-b border-white/5 pb-4 capitalize">
          {CATEGORIES.find((c) => c.id === activeCategory)?.label}
        </h3>

        <div className="space-y-12 min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              {MENU_DATA[activeCategory]?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row md:items-end justify-between group cursor-pointer"
                >
                  <div className="flex-grow">
                    <div className="flex items-center mb-2">
                      <h4 className="font-serif text-2xl text-on-surface group-hover:text-secondary transition-colors duration-300">
                        {item.name}
                      </h4>
                      <div className="sommelier-divider hidden md:block" />
                    </div>
                    <p className="font-sans text-sm text-on-surface-variant/80 max-w-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0 font-sans font-bold text-sm tracking-wider text-secondary whitespace-nowrap">
                    {item.price}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};
