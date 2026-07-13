import React from "react";
import { FiTruck, FiLock, FiAward } from "react-icons/fi";

const Features = () => {
  const features = [
    {
      icon: <FiTruck size={28} className="text-emerald-600" />,
      title: "Fast & Free Shipping",
      desc: "Free shipping on all orders over $35. Delivered right to your doorstep safely.",
    },
    {
      icon: <FiLock size={28} className="text-emerald-600" />,
      title: "Secure Payments",
      desc: "100% secure payment gateway with SSL encryption supporting all major cards.",
    },
    {
      icon: <FiAward size={28} className="text-emerald-600" />,
      title: "Original Collections",
      desc: "We guarantee 100% authentic and original prints directly from top publishers.",
    },
  ];

  return (
    <section className="py-14 bg-white border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 p-5 rounded-2xl border border-stone-100 hover:border-stone-200 bg-stone-50/40 transition-all group"
          >
            <div className="p-3 bg-emerald-50 rounded-xl group-hover:bg-emerald-100/70 transition-colors flex-shrink-0">
              {feat.icon}
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-800 uppercase tracking-wide mb-1">
                {feat.title}
              </h3>
              <p className="text-sm text-stone-600 font-medium leading-relaxed">
                {feat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
