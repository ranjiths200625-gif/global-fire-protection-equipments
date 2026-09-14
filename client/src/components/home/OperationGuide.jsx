import React from 'react';
import { Gauge, KeyRound, Target, Hand, MoveHorizontal, AlertTriangle } from 'lucide-react';

const steps = [
  {
    step: '1',
    title: 'Check Pressure Gauge',
    description: 'Verify that the pressure gauge needle is in the operable green zone prior to use.',
    icon: Gauge,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 border-emerald-200',
  },
  {
    step: '2',
    title: 'Pull the Pin',
    description: 'Pull the safety pin located at the top of the handle to break the tamper seal.',
    icon: KeyRound,
    color: 'text-amber-600',
    bg: 'bg-amber-50 border-amber-200',
  },
  {
    step: '3',
    title: 'Aim at Base of Fire',
    description: 'Stand at a safe distance (6 to 8 feet) and aim the nozzle or discharge horn at the base of the fire.',
    icon: Target,
    color: 'text-brand-600',
    bg: 'bg-red-50 border-red-200',
  },
  {
    step: '4',
    title: 'Squeeze the Lever',
    description: 'Squeeze the operating lever slowly and evenly to discharge the extinguishing agent.',
    icon: Hand,
    color: 'text-blue-600',
    bg: 'bg-blue-50 border-blue-200',
  },
  {
    step: '5',
    title: 'Sweep Side to Side',
    description: 'Sweep the nozzle from side to side across the base of the fire until flames are fully extinguished.',
    icon: MoveHorizontal,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50 border-cyan-200',
  },
];

const OperationGuide = () => {
  return (
    <section id="guide" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700 bg-brand-50 border border-brand-200 px-4 py-1.5 rounded-full inline-block mb-3">
            Safety Guidance
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 tracking-tight">
            Basic Fire Extinguisher Operation
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Standard 5-step operational procedure for portable fire extinguishers.
          </p>
        </div>

        {/* 5-Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between relative group hover:border-brand-300 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-full bg-brand-700 text-white font-heading font-black text-sm flex items-center justify-center shadow-xs">
                      {item.step}
                    </span>
                    <div className={`p-2 rounded-xl border ${item.bg}`}>
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                  </div>
                  <h3 className="text-sm font-heading font-bold text-slate-900 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Educational Graphic Banner */}
        <div className="rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 p-4 sm:p-6 mb-8 flex justify-center items-center shadow-xl">
          <img
            src="/assets/gallery/operation-guide.svg"
            alt="Basic Fire Extinguisher Operation 5 Steps Guide"
            className="w-full max-w-4xl h-auto rounded-2xl object-contain"
          />
        </div>

        {/* Safety Disclaimer Warning Box */}
        <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200/90 max-w-4xl mx-auto flex items-start gap-4 shadow-sm">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm text-slate-700">
            <p className="font-bold text-amber-900">Safety &amp; Evacuation Note</p>
            <p className="leading-relaxed">
              Only attempt to use a fire extinguisher when it is safe to do so. If a fire is spreading or cannot be controlled safely, evacuate and contact emergency services.
            </p>
            <p className="text-xs text-slate-500 pt-1">
              * This informational guide is provided for general awareness and is not a substitute for hands-on, professional fire-safety training.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default OperationGuide;
