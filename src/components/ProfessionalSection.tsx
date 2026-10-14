import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Star, UserRound } from 'lucide-react';
import { CLINIC, TEAM, whatsappUrl } from '../data/clinicData';
import { WhatsAppIcon } from './BrandIcons';

const SLIDES = ['Profesional', 'Equipo de trabajo'];

const rutaFoto = (foto: string | null) => (foto ? `${import.meta.env.BASE_URL}${foto}` : null);

export const ProfessionalSection: React.FC = () => {
  const pista = useRef<HTMLDivElement>(null);
  const [activo, setActivo] = useState(0);
  const foto = rutaFoto(CLINIC.photo);

  const alScrollear = () => {
    const el = pista.current;
    if (!el || el.clientWidth === 0) return;
    setActivo(Math.round(el.scrollLeft / el.clientWidth));
  };

  const irA = (i: number) => {
    const el = pista.current;
    if (!el) return;
    const destino = Math.max(0, Math.min(SLIDES.length - 1, i));
    el.scrollTo({ left: destino * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <section id="profesional" className="relative py-20 lg:py-24 bg-white border-b border-pink-100 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-pink-100/70 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-violet-100/60 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado del carrusel: el título cambia según la tarjeta que se está viendo */}
        <div className="flex items-center justify-between gap-4 mb-10">
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-pink-100 text-purple-800 text-xs font-bold uppercase tracking-wider">
            {SLIDES[activo]}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2" role="tablist" aria-label="Secciones del carrusel">
              {SLIDES.map((nombre, i) => (
                <button
                  key={nombre}
                  type="button"
                  role="tab"
                  aria-selected={activo === i}
                  aria-label={nombre}
                  onClick={() => irA(i)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    activo === i ? 'w-8 bg-fuchsia-600' : 'w-2.5 bg-pink-200 hover:bg-pink-300'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => irA(activo - 1)}
                disabled={activo === 0}
                aria-label="Anterior"
                className="w-9 h-9 rounded-full border border-pink-200 bg-white text-purple-800 flex items-center justify-center hover:bg-pink-50 disabled:opacity-35 disabled:cursor-default transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => irA(activo + 1)}
                disabled={activo === SLIDES.length - 1}
                aria-label="Siguiente"
                className="w-9 h-9 rounded-full border border-pink-200 bg-white text-purple-800 flex items-center justify-center hover:bg-pink-50 disabled:opacity-35 disabled:cursor-default transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={pista}
          onScroll={alScrollear}
          className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
        >
          {/* Tarjeta 1: la profesional */}
          <div className="basis-full w-full min-w-0 grow-0 shrink-0 snap-center px-1">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <div className="relative max-w-md mx-auto">
                  <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-fuchsia-400 via-pink-300 to-purple-600 opacity-80 blur-sm" />
                  <div className="relative rounded-[1.75rem] overflow-hidden bg-pink-100 shadow-2xl shadow-purple-900/20 aspect-square">
                    {foto ? (
                      <img
                        src={foto}
                        alt={`${CLINIC.professional}, odontóloga de ${CLINIC.name}`}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-fuchsia-500 via-fuchsia-600 to-pink-500 flex items-center justify-center">
                        <span className="text-white text-7xl font-extrabold tracking-wide drop-shadow">
                          {CLINIC.initials}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="relative -mt-8 mx-6 rounded-2xl bg-white shadow-xl shadow-purple-900/10 border border-pink-100 px-5 py-4 text-center">
                    <h3 className="text-xl font-extrabold text-slate-900">{CLINIC.professional}</h3>
                    <p className="text-sm text-fuchsia-700 font-semibold mt-0.5">Odontóloga · {CLINIC.name}</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                  Atención personalizada en{' '}
                  <span className="bg-gradient-to-r from-fuchsia-600 to-pink-500 bg-clip-text text-transparent">
                    {CLINIC.locality}
                  </span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-7">
                  En {CLINIC.name} te atiende {CLINIC.professional}. Escribile por WhatsApp para contarle qué
                  necesitás y coordinar tu turno.
                </p>

                <div className="flex flex-wrap items-center gap-3 text-sm font-semibold mb-8">
                  <a
                    href={CLINIC.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors"
                  >
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>
                      {CLINIC.googleRating} en Google ({CLINIC.googleReviews} opiniones)
                    </span>
                  </a>
                  <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-fuchsia-50 text-purple-900 border border-pink-200">
                    <MapPin className="w-4 h-4 text-fuchsia-600" />
                    <span>
                      {CLINIC.street}, {CLINIC.locality}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={whatsappUrl(`Hola ${CLINIC.professional}! Quisiera pedir un turno.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-bold text-white bg-[#16c55e] hover:bg-[#12a84f] rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:-translate-y-0.5"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    <span>Escribirle por WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => irA(1)}
                    className="inline-flex items-center gap-1.5 px-5 py-3.5 text-sm font-bold text-purple-800 bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-xl transition-colors cursor-pointer"
                  >
                    <span>Conocé al equipo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta 2: el equipo de trabajo */}
          <div className="basis-full w-full min-w-0 grow-0 shrink-0 snap-center px-1">
            <div className="max-w-3xl mb-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                Equipo de{' '}
                <span className="bg-gradient-to-r from-fuchsia-600 to-pink-500 bg-clip-text text-transparent">
                  trabajo
                </span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Las personas que te reciben y te acompañan en cada consulta en {CLINIC.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TEAM.map((m) => {
                const fotoMiembro = rutaFoto(m.photo);
                return (
                  <div
                    key={m.role}
                    className="bg-white rounded-3xl border border-pink-100 shadow-lg shadow-purple-900/5 overflow-hidden"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-fuchsia-50 to-pink-100 flex items-center justify-center">
                      {fotoMiembro ? (
                        <img
                          src={fotoMiembro}
                          alt={`${m.name ?? m.role}, ${m.role.toLowerCase()} de ${CLINIC.name}`}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-fuchsia-400">
                          <div className="w-20 h-20 rounded-full border-2 border-dashed border-fuchsia-300 flex items-center justify-center">
                            <UserRound className="w-9 h-9" />
                          </div>
                          <span className="text-xs font-semibold">Foto del integrante</span>
                        </div>
                      )}
                    </div>
                    <div className="px-5 py-4 text-center">
                      <p className="text-xs font-bold uppercase tracking-wider text-fuchsia-700">{m.role}</p>
                      <p className={`mt-1 text-base font-bold ${m.name ? 'text-slate-900' : 'text-slate-400 italic'}`}>
                        {m.name ?? 'Nombre y apellido'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
