import React from "react";

const Stats = () => {
  const stats = [
    { value: "15,000+", label: "Books Available" },
    { value: "8,500+", label: "Happy Readers" },
    { value: "450+", label: "Verified Sellers" },
    { value: "4.9/5", label: "Store Rating" },
  ];

  return (
    <section className="py-12 bg-stone-900 text-[#f5f3e6] border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {stats.map((stat, idx) => (
          <div key={idx} className="space-y-1">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight text-amber-400">
              {stat.value}
            </h3>
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
