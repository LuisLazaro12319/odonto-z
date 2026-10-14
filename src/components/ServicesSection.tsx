import React from 'react';
import { Activity, ArrowUpRight, Layers, ShieldCheck, Smile, Sparkles, Stethoscope } from 'lucide-react';
import { CLINIC, SERVICES, whatsappUrl, type DentalService } from '../data/clinicData';

// Clases escritas completas para que Tailwind las detecte.
const ESTILOS: Record<DentalService['icon'], { icon: React.ReactNode; badge: string; barra: string; link: string }> = {
  stethoscope: {
    icon: <Stethoscope className="w-6 h-6 text-white" />,
    badge: 'from-fuchsia-500 to-purple-600',
    barra: 'from-fuchsia-500 to-purple-600',
    link: 'text-fuchsia-700 hover:text-purple-900',
  },
  sparkles: {
    icon: <Sparkles className="w-6 h-6 text-white" />,
    badge: 'from-indigo-500 to-violet-500',
    barra: 'from-indigo-500 to-violet-500',
    link: 'text-indigo-700 hover:text-indigo-900',
  },
  layers: {
    icon: <Layers className="w-6 h-6 text-white" />,
    badge: 'from-amber-400 to-orange-500',
    barra: 'from-amber-400 to-orange-500',
    link: 'text-orange-600 hover:text-orange-800',
  },
  shield: {
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
    badge: 'from-rose-500 to-pink-500',
    barra: 'from-rose-500 to-pink-500',
    link: 'text-rose-600 hover:text-rose-800',
  },
  activity: {
    icon: <Activity className="w-6 h-6 text-white" />,
    badge: 'from-emerald-500 to-teal-500',
    barra: 'from-emerald-500 to-teal-500',
    link: 'text-emerald-700 hover:text-emerald-900',
  },
  smile: {
    icon: <Smile className="w-6 h-6 text-white" />,
    badge: 'from-pink-400 to-fuchsia-500',
    barra: 'from-pink-400 to-fuchsia-500',
    link: 'text-pink-700 hover:text-fuchsia-900',
  },
};

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="tratamientos"
      className="py-20 lg:py-24 bg-gradient-to-b from-fuchsia-50 via-white to-pink-50 border-b border-pink-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-pink-100 text-purple-800 text-xs font-bold uppercase tracking-wider mb-4">
            Tratamientos
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Lo que podemos hacer por tu{' '}
            <span className="bg-gradient-to-r from-fuchsia-600 to-pink-500 bg-clip-text text-transparent">
              salud bucal
            </span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Consultanos por WhatsApp cuál es el tratamiento que necesitás y coordinamos tu turno.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const e = ESTILOS[service.icon];
            return (
              <div
                key={service.id}
                className="group relative bg-white rounded-2xl border border-slate-100 p-7 flex flex-col justify-between shadow-md shadow-purple-900/5 hover:shadow-xl hover:shadow-purple-900/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${e.barra}`} />
                <div>
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${e.badge} flex items-center justify-center shadow-lg mb-5`}
                  >
                    {e.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 leading-snug mb-2">{service.name}</h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{service.description}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <a
                    href={whatsappUrl(`Hola! Quisiera consultar por ${service.name} en ${CLINIC.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 text-sm font-bold transition-colors ${e.link}`}
                  >
                    <span>Consultar por WhatsApp</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
