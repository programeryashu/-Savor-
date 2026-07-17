import React from "react";
import { motion } from "framer-motion";

interface HomeProps {
  setActivePage: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setActivePage }) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Zoom effect */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA4EJcbDEa4jNwCJPah0KE2ZqGyhS6-QiRCbp38-ry1QSh0Fj3TSK8QJXRPHg4qZMf_-Yw3Am-PYZHwTkfQuUrAD4lcHHGfvRvCBcNz5FZ4oauGpB_40EDadukNjAu6YwtSEPLElcLqfXe6lV2xzO2OzkH51U4qta7v4JPrdBziP_xKcf7USFVfoXGM2ZTB4RuBBHBLN5jdyOReDupLcTjH2LPkjSL5R54OHLfDxq34oPSBDEhwwp_E')`,
          }}
          aria-hidden="true"
        />
        {/* Parallax Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/80" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-margin-mobile w-full max-w-4xl mx-auto mt-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-sans text-xs md:text-sm font-semibold text-secondary uppercase tracking-[0.25em] mb-6 block"
          >
            An Exclusive Culinary Journey
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.0 }}
            className="font-serif text-5xl md:text-8xl text-on-surface mb-8 leading-tight drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
          >
            The Art of Taste
          </motion.h1>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            onClick={() => setActivePage("reservations")}
            className="mt-8 bg-secondary text-background font-sans font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full hover:bg-secondary-fixed transition-all duration-300 active:scale-95 shadow-[0_20px_40px_rgba(211,197,168,0.25)] cursor-pointer focus-visible:outline-2 focus-visible:outline-secondary"
          >
            Reservations
          </motion.button>
        </div>
      </section>

      {/* Our Story Section */}
      <section
        id="story-section"
        className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:col-span-6 md:col-start-2"
          >
            <h2 className="font-serif text-4xl md:text-6xl text-on-surface mb-8 leading-tight">
              Heritage <br />
              <span className="text-secondary italic">&amp;</span> Innovation
            </h2>
            <p className="font-sans text-base md:text-lg text-on-surface-variant mb-6 leading-relaxed opacity-90">
              At Savoré, we believe that fine dining is a delicate balance of deep-rooted culinary heritage and bold,
              modern innovation. Every dish is a carefully crafted narrative, designed to evoke memory and inspire the
              senses.
            </p>
            <p className="font-sans text-sm text-on-surface-variant opacity-70 leading-relaxed mb-8">
              Our ingredients are sourced with meticulous care, prioritizing local artisans and sustainable practices to
              ensure the purest expression of flavor.
            </p>
            <button
              onClick={() => setActivePage("menu")}
              className="inline-block font-sans text-xs font-semibold text-secondary uppercase tracking-widest border-b border-secondary/30 hover:border-secondary transition-colors duration-300 pb-1 cursor-pointer"
            >
              Discover Our Story
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:col-span-4 md:col-start-9 mt-12 md:mt-0 relative"
          >
            <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-white/10 relative group">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Executive Chef"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxFnscsAHefVKNlu8xsB7MpY0TAyE6_ehIEAHJ10_GAwHWuCskihv5HY2dIcus1CbW20kfEFnlOPZlG_DEawt4AH5V8nckKUx9kueAD5vLFM_qj-K4mUqYPfwa0GHfpj-mQ4n3wpQ9B5rTeZoWtw_PlcHAsVrR4xmQ2DxOdWZAAEAYxQ7kMKY0lS7f0UVUDAN33rMP1R5VJYKfeS1tvqy2R6Yr913SrD0eVGK0AdDdqRWzTQb-H15U"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signature Dishes Showcase */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-6xl text-on-surface mb-4"
            >
              Signature Creations
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-sans text-sm text-secondary tracking-widest uppercase opacity-80 max-w-xl mx-auto"
            >
              A symphony of textures and flavors, meticulously curated for the discerning palate.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* List */}
            <div className="order-2 md:order-1 flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-surface-container p-8 rounded-xl border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:border-secondary/30 transition-colors duration-500 group cursor-pointer"
              >
                <h3 className="font-serif text-2xl text-on-surface mb-2 group-hover:text-secondary transition-colors duration-300">
                  Truffle Infused Scallop
                </h3>
                <div className="h-px w-12 bg-secondary/30 my-4 group-hover:w-20 transition-all duration-300" />
                <p className="font-sans text-sm text-on-surface-variant opacity-70 leading-relaxed">
                  Pan-seared Hokkaido scallop, cauliflower purée, black winter truffle shavings, and a delicate brown
                  butter emulsion.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-surface-container p-8 rounded-xl border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:border-secondary/30 transition-colors duration-500 group cursor-pointer"
              >
                <h3 className="font-serif text-2xl text-on-surface mb-2 group-hover:text-secondary transition-colors duration-300">
                  Wagyu &amp; Wild Mushrooms
                </h3>
                <div className="h-px w-12 bg-secondary/30 my-4 group-hover:w-20 transition-all duration-300" />
                <p className="font-sans text-sm text-on-surface-variant opacity-70 leading-relaxed">
                  A5 Japanese Wagyu beef, foraged wild mushrooms, smoked potato mille-feuille, finished with a rich
                  bordelaise reduction.
                </p>
              </motion.div>
            </div>

            {/* Visual spotlight */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2 relative aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] group cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDZCcvsgB_xrxgOZ4yZKGegjOtaFd8FcYWoT9KxD2isY-JWlorgYDclGy34HRpFuDWx-dtClkJfWmyaX3zQPtCfsCXCkj0znRYstQfh8fc6i7-KE_Zj-x7pMAxxA1jKqLZK9uKvU4F0a-nUV3sE27PPApUGVHIwHMuMfWBPqKcTdMJnTz4GHGNh7LdB62poCOvDmNNlCZQfn0O-yWxNbXQqoZDb-7PfcKMPWKXHDLpV5FEau1gWP_5v')`,
                }}
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />

              {/* Glassmorphism details overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="font-sans text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-1 block">
                  Tasting Menu Highlight
                </span>
                <h4 className="font-serif text-xl text-on-surface">Course III</h4>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Space Section */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row gap-gutter items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 aspect-[4/5] rounded-xl overflow-hidden border border-white/10 shadow-2xl relative"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAf10i_OmkjW5Kqr2Sq9MN7puvv7cKQybrDw904OmhVNmBrPFruRbCXb5aVuc2fmlopbwNKfwKUJPuH7L_OszzaxHa-XOiG1x9mPiH7mF32HVBTcrWqEwBXk6tL71-2M72nORwoyUGxwkdNqJPVYIRKpqE7UV0pAd-zoNkIiazTTuGTj40LM5ywaoFAtMbpb-IDRBK4Ppfpi1ibMGsU7Qiql5RNKBJWtrcXOoZZiJjVgg4C5Fa-0oEk')`,
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 md:pl-12 mt-8 md:mt-0"
          >
            <span className="font-sans text-xs md:text-sm font-semibold text-secondary uppercase tracking-[0.2em] mb-4 block">
              Atmosphere
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-on-surface mb-6 leading-tight">
              An Intimate <br />
              Sanctuary
            </h2>
            <p className="font-sans text-base md:text-lg text-on-surface-variant opacity-80 mb-8 leading-relaxed">
              Step into a realm of hushed luxury. Savoré's dining room is designed to minimize distraction and elevate
              focus, enveloping guests in rich textures, ambient lighting, and impeccable service.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="border-l border-secondary/30 pl-4">
                <span className="block font-serif text-3xl md:text-4xl text-on-surface mb-1">12</span>
                <span className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                  Exclusive Tables
                </span>
              </div>
              <div className="border-l border-secondary/30 pl-4">
                <span className="block font-serif text-3xl md:text-4xl text-on-surface mb-1">200+</span>
                <span className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                  Wine Labels
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
