import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Users, Calendar, Clock, Minus, Plus, Check, Ticket, Sparkles } from "lucide-react";

interface ReservationDetails {
  guests: number;
  date: { month: string; day: string; weekday: string };
  time: string;
  name: string;
  email: string;
  phone: string;
  requests: string;
}

export const Reservations: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [details, setDetails] = useState<ReservationDetails>({
    guests: 2,
    date: { month: "Oct", day: "19", weekday: "Sat" },
    time: "19:00",
    name: "",
    email: "",
    phone: "",
    requests: "",
  });

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Next 7 days generator
  const DATES = [
    { month: "Oct", day: "18", weekday: "Fri" },
    { month: "Oct", day: "19", weekday: "Sat" },
    { month: "Oct", day: "20", weekday: "Sun" },
    { month: "Oct", day: "21", weekday: "Mon" },
    { month: "Oct", day: "22", weekday: "Tue" },
    { month: "Oct", day: "23", weekday: "Wed" },
    { month: "Oct", day: "24", weekday: "Thu" },
  ];

  const TIMES = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30"];

  const handleGuestChange = (change: number) => {
    setDetails((prev) => {
      const next = prev.guests + change;
      if (next < 1) return { ...prev, guests: 1 };
      if (next > 12) return { ...prev, guests: 12 };
      return { ...prev, guests: next };
    });
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!details.name.trim()) newErrors.name = "Full name is required.";
    if (!details.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(details.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!details.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[+]?[0-9\s-]{7,15}$/.test(details.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (validateStep2()) {
        setStep(3);
      }
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleConfirm = () => {
    setIsSuccess(true);
  };

  // Step transitions config
  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut" as const },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeInOut" as const },
    }),
  };

  if (isSuccess) {
    return (
      <main className="flex-grow pt-32 pb-32 px-margin-mobile md:px-margin-desktop max-w-[600px] mx-auto w-full relative z-10 flex flex-col items-center justify-center min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-surface-container rounded-2xl border-t-[3px] border-secondary p-8 w-full shadow-[0_30px_60px_rgba(0,0,0,0.6)] text-center relative overflow-hidden gold-border-subtle"
        >
          {/* Decorative Sparkles */}
          <div className="absolute top-4 left-4 text-secondary/30">
            <Sparkles size={24} />
          </div>
          <div className="absolute top-4 right-4 text-secondary/30">
            <Sparkles size={24} />
          </div>

          <div className="w-16 h-16 rounded-full bg-secondary/15 flex items-center justify-center text-secondary mx-auto mb-6">
            <Check size={32} />
          </div>

          <h1 className="font-serif text-3xl md:text-4xl text-on-surface mb-2">Reservation Confirmed</h1>
          <p className="font-sans text-sm text-on-surface-variant mb-8 leading-relaxed">
            We are delighted to welcome you to Savoré. A confirmation email with details has been sent to your address.
          </p>

          <div className="bg-[#181717] rounded-xl p-6 border border-white/5 text-left space-y-4 mb-8">
            <div className="flex justify-between border-b border-white/5 pb-3">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider">Reservation ID</span>
              <span className="font-mono text-sm text-secondary font-bold">SAV-89214595</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-3">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider">Date &amp; Time</span>
              <span className="text-sm text-on-surface font-semibold">
                {details.date.weekday}, {details.date.month} {details.date.day} at {details.time}
              </span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-3">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider">Guests</span>
              <span className="text-sm text-on-surface">
                {details.guests} {details.guests === 1 ? "Person" : "People"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider">Guest Name</span>
              <span className="text-sm text-on-surface">{details.name}</span>
            </div>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-secondary text-background font-sans font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-secondary-fixed transition-colors shadow-[0_4px_14px_rgba(211,197,168,0.2)] cursor-pointer"
          >
            Go Back Home
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="flex-grow pt-32 pb-32 px-margin-mobile md:px-margin-desktop max-w-[600px] mx-auto w-full relative z-10">
      {/* Progress Indicator */}
      <div className="flex justify-between items-center mb-12 px-4 relative">
        <div className="absolute top-1/2 left-8 right-8 h-[1px] bg-white/10 -z-10 transform -translate-y-1/2" />
        <div className="flex flex-col items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              step >= 1 ? "bg-secondary" : "bg-white/10"
            }`}
          />
          <span
            className={`font-sans text-[10px] uppercase tracking-wider ${
              step >= 1 ? "text-secondary font-semibold" : "text-on-surface-variant"
            }`}
          >
            Details
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              step >= 2 ? "bg-secondary" : "bg-white/10"
            }`}
          />
          <span
            className={`font-sans text-[10px] uppercase tracking-wider ${
              step >= 2 ? "text-secondary font-semibold" : "text-on-surface-variant"
            }`}
          >
            Guest
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              step >= 3 ? "bg-secondary" : "bg-white/10"
            }`}
          />
          <span
            className={`font-sans text-[10px] uppercase tracking-wider ${
              step >= 3 ? "text-secondary font-semibold" : "text-on-surface-variant"
            }`}
          >
            Confirm
          </span>
        </div>
      </div>

      {/* Screen Steps */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step-1"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideVariants}
            className="space-y-10"
          >
            <div className="text-center mb-10">
              <h1 className="font-serif text-3xl md:text-4xl text-on-surface mb-2">Reserve Your Table</h1>
              <p className="font-sans text-sm text-on-surface-variant opacity-80">Select your preferred dining details.</p>
            </div>

            {/* Guests */}
            <div className="bg-surface-container rounded-xl p-6 border border-white/5 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
              <h2 className="font-sans text-xs font-semibold tracking-wider text-on-surface mb-6 flex items-center gap-2">
                <Users size={16} className="text-secondary" />
                PARTY SIZE
              </h2>
              <div className="flex justify-between items-center bg-background rounded-full p-2 border border-white/5">
                <button
                  type="button"
                  onClick={() => handleGuestChange(-1)}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all cursor-pointer"
                >
                  <Minus size={20} />
                </button>
                <div className="font-serif text-3xl text-secondary">{details.guests}</div>
                <button
                  type="button"
                  onClick={() => handleGuestChange(1)}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all cursor-pointer"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Date */}
            <div className="bg-surface-container rounded-xl p-6 border border-white/5 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
              <h2 className="font-sans text-xs font-semibold tracking-wider text-on-surface mb-6 flex items-center gap-2">
                <Calendar size={16} className="text-secondary" />
                DATE
              </h2>
              {/* Horizontal Dates */}
              <div className="flex overflow-x-auto gap-4 pb-4 -mx-2 px-2 snap-x no-scrollbar">
                {DATES.map((date, idx) => {
                  const isSelected = details.date.day === date.day;
                  return (
                    <button
                      key={idx}
                      onClick={() => setDetails((prev) => ({ ...prev, date }))}
                      className={`flex-shrink-0 snap-center w-20 h-24 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all ${
                        isSelected
                          ? "bg-secondary/15 border-2 border-secondary shadow-[0_0_15px_rgba(211,197,168,0.15)] text-secondary"
                          : "bg-background border border-white/10 hover:border-secondary/40 text-on-surface"
                      }`}
                    >
                      <span
                        className={`font-sans text-[10px] uppercase mb-1 tracking-wider ${
                          isSelected ? "text-secondary" : "text-on-surface-variant"
                        }`}
                      >
                        {date.month}
                      </span>
                      <span className="font-serif text-2xl font-medium">{date.day}</span>
                      <span
                        className={`font-sans text-[10px] mt-1 ${
                          isSelected ? "text-secondary" : "text-on-surface-variant"
                        }`}
                      >
                        {date.weekday}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 text-center">
                <button className="font-sans text-[10px] font-bold text-secondary hover:text-on-surface transition-colors uppercase tracking-widest border-b border-transparent hover:border-on-surface pb-1 cursor-pointer">
                  View Calendar
                </button>
              </div>
            </div>

            {/* Time */}
            <div className="bg-surface-container rounded-xl p-6 border border-white/5 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
              <h2 className="font-sans text-xs font-semibold tracking-wider text-on-surface mb-6 flex items-center gap-2">
                <Clock size={16} className="text-secondary" />
                TIME
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {TIMES.map((time, idx) => {
                  const isSelected = details.time === time;
                  return (
                    <button
                      key={idx}
                      onClick={() => setDetails((prev) => ({ ...prev, time }))}
                      className={`py-3 rounded-lg font-sans font-bold text-sm tracking-wider cursor-pointer transition-all ${
                        isSelected
                          ? "bg-secondary/15 border border-secondary text-secondary shadow-[0_0_15px_rgba(211,197,168,0.15)]"
                          : "bg-background border border-white/10 hover:border-secondary/40 text-on-surface-variant hover:text-on-surface"
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next Button */}
            <div className="pt-4">
              <button
                onClick={handleNextStep}
                className="w-full py-4 bg-secondary text-background font-sans font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-secondary-fixed transition-colors shadow-[0_4px_14px_rgba(211,197,168,0.2)] cursor-pointer"
              >
                Continue to Details
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step-2"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideVariants}
            className="space-y-8"
          >
            <div className="text-center mb-10">
              <button
                onClick={handlePrevStep}
                className="inline-flex items-center gap-2 text-xs text-on-surface-variant hover:text-secondary mb-4 cursor-pointer"
              >
                <ArrowLeft size={14} /> Back
              </button>
              <h1 className="font-serif text-3xl md:text-4xl text-on-surface mb-2">Guest Details</h1>
              <p className="font-sans text-sm text-on-surface-variant opacity-80">Please provide your contact information.</p>
            </div>

            <div className="space-y-6 bg-surface-container rounded-xl p-6 md:p-8 border border-white/5 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
              {/* Name */}
              <div className="relative">
                <input
                  className={`peer w-full bg-transparent border-0 border-b ${
                    errors.name ? "border-error focus:border-error" : "border-white/20 focus:border-secondary"
                  } px-0 py-3 text-on-surface focus:ring-0 transition-colors placeholder-transparent font-sans text-base focus:outline-none`}
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  value={details.name}
                  onChange={(e) => {
                    setDetails((prev) => ({ ...prev, name: e.target.value }));
                    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                />
                <label
                  className="absolute left-0 -top-3.5 font-sans text-xs text-on-surface-variant transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-on-surface-variant/50 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-secondary cursor-text"
                  htmlFor="name"
                >
                  Full Name
                </label>
                {errors.name && <p className="text-error text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  className={`peer w-full bg-transparent border-0 border-b ${
                    errors.email ? "border-error focus:border-error" : "border-white/20 focus:border-secondary"
                  } px-0 py-3 text-on-surface focus:ring-0 transition-colors placeholder-transparent font-sans text-base focus:outline-none`}
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  value={details.email}
                  onChange={(e) => {
                    setDetails((prev) => ({ ...prev, email: e.target.value }));
                    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                />
                <label
                  className="absolute left-0 -top-3.5 font-sans text-xs text-on-surface-variant transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-on-surface-variant/50 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-secondary cursor-text"
                  htmlFor="email"
                >
                  Email Address
                </label>
                {errors.email && <p className="text-error text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="relative">
                <input
                  className={`peer w-full bg-transparent border-0 border-b ${
                    errors.phone ? "border-error focus:border-error" : "border-white/20 focus:border-secondary"
                  } px-0 py-3 text-on-surface focus:ring-0 transition-colors placeholder-transparent font-sans text-base focus:outline-none`}
                  id="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={details.phone}
                  onChange={(e) => {
                    setDetails((prev) => ({ ...prev, phone: e.target.value }));
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                  }}
                />
                <label
                  className="absolute left-0 -top-3.5 font-sans text-xs text-on-surface-variant transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-on-surface-variant/50 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-secondary cursor-text"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                {errors.phone && <p className="text-error text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Special Requests */}
              <div className="relative pt-4">
                <textarea
                  className="peer w-full bg-transparent border-0 border-b border-white/20 px-0 py-2 text-on-surface focus:ring-0 focus:border-secondary transition-colors placeholder-transparent font-sans text-sm resize-none focus:outline-none"
                  id="requests"
                  rows={2}
                  placeholder="Special Requests"
                  value={details.requests}
                  onChange={(e) => setDetails((prev) => ({ ...prev, requests: e.target.value }))}
                />
                <label
                  className="absolute left-0 -top-3.5 font-sans text-xs text-on-surface-variant transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-on-surface-variant/50 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-secondary cursor-text"
                  htmlFor="requests"
                >
                  Special Requests (Optional)
                </label>
                <p className="font-sans text-[10px] text-on-surface-variant/50 mt-1">
                  Dietary restrictions, celebrations, etc.
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex gap-4">
              <button
                onClick={handlePrevStep}
                className="w-1/3 py-4 bg-transparent border border-white/20 hover:border-white/40 text-on-surface font-sans font-bold text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handleNextStep}
                className="w-2/3 py-4 bg-secondary text-background font-sans font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-secondary-fixed transition-colors shadow-[0_4px_14px_rgba(211,197,168,0.2)] cursor-pointer"
              >
                Review Details
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step-3"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideVariants}
            className="space-y-8"
          >
            <div className="text-center mb-10">
              <button
                onClick={handlePrevStep}
                className="inline-flex items-center gap-2 text-xs text-on-surface-variant hover:text-secondary mb-4 cursor-pointer"
              >
                <ArrowLeft size={14} /> Back
              </button>
              <h1 className="font-serif text-3xl md:text-4xl text-on-surface mb-2">Review Summary</h1>
              <p className="font-sans text-sm text-on-surface-variant opacity-80">Please confirm your reservation details.</p>
            </div>

            {/* Receipt Ticket layout */}
            <div className="bg-[#181717] rounded-xl p-8 border-t-[3px] border-secondary relative overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] gold-border-subtle">
              {/* Receipt notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-4 bg-background rounded-full" />

              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 text-secondary mb-2">
                  <Ticket size={24} />
                </div>
                <span className="font-serif text-3xl text-on-surface tracking-tighter">Savoré</span>
                <div className="font-sans text-[10px] font-bold text-on-surface-variant mt-2 tracking-[0.25em] uppercase">
                  Reservation Ticket
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                  <div>
                    <span className="font-sans text-[10px] text-on-surface-variant uppercase tracking-widest block mb-1">
                      Date
                    </span>
                    <span className="font-serif text-lg text-on-surface">
                      {details.date.weekday}, {details.date.month} {details.date.day}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-sans text-[10px] text-on-surface-variant uppercase tracking-widest block mb-1">
                      Time
                    </span>
                    <span className="font-serif text-lg text-secondary">{details.time}</span>
                  </div>
                </div>

                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                  <div>
                    <span className="font-sans text-[10px] text-on-surface-variant uppercase tracking-widest block mb-1">
                      Guests
                    </span>
                    <span className="font-sans text-sm text-on-surface font-semibold">
                      {details.guests} {details.guests === 1 ? "Person" : "People"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-sans text-[10px] text-on-surface-variant uppercase tracking-widest block mb-1">
                      Area
                    </span>
                    <span className="font-sans text-sm text-on-surface font-semibold">Main Dining Room</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="font-sans text-[10px] text-on-surface-variant uppercase tracking-widest block mb-2">
                    Guest Information
                  </span>
                  <div className="font-sans text-sm font-bold text-on-surface">{details.name}</div>
                  <div className="font-sans text-xs text-on-surface-variant/80 mt-1">{details.email}</div>
                  <div className="font-sans text-xs text-on-surface-variant/80 mt-0.5">{details.phone}</div>
                  {details.requests && (
                    <div className="mt-3 bg-white/5 p-3 rounded text-xs text-on-surface-variant italic">
                      "{details.requests}"
                    </div>
                  )}
                </div>
              </div>

              {/* Zigzag bottom border */}
              <div
                className="absolute bottom-0 left-0 w-full h-3"
                style={{
                  backgroundImage:
                    "linear-gradient(-45deg, transparent 75%, #181717 75%), linear-gradient(45deg, transparent 75%, #181717 75%)",
                  backgroundSize: "10px 10px",
                  backgroundPosition: "0 0, 0 0",
                }}
              />
            </div>

            <div className="text-center px-4">
              <p className="font-sans text-[10px] text-on-surface-variant/60 leading-relaxed">
                By confirming, you agree to our cancellation policy. A temporary hold may be placed on your credit card for
                late cancellations or no-shows.
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="flex gap-4">
              <button
                onClick={handlePrevStep}
                className="w-1/3 py-4 bg-transparent border border-white/20 hover:border-white/40 text-on-surface font-sans font-bold text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={handleConfirm}
                className="w-2/3 py-4 bg-secondary text-background font-sans font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-secondary-fixed transition-all duration-300 shadow-[0_4px_20px_rgba(211,197,168,0.3)] relative overflow-hidden group cursor-pointer"
              >
                <span className="relative z-10">Confirm Reservation</span>
                <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
