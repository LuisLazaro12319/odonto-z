import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { CLINIC, SCHEDULE } from '../data/clinicData';
import { InstagramIcon, WhatsAppIcon } from './BrandIcons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-purple-950 via-purple-900 to-fuchsia-900 text-pink-100 text-sm border-t-4 border-pink-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <div className="text-lg font-bold text-white">{CLINIC.name}</div>
            <p className="text-pink-200 leading-relaxed">
              Consultorio odontológico: {CLINIC.servicesSummary}.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={CLINIC.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${CLINIC.instagramHandle}`}
                className="w-9 h-9 rounded-full bg-white/10 text-white hover:bg-gradient-to-tr hover:from-[#feda75] hover:via-[#d62976] hover:to-[#4f5bd5] hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <InstagramIcon className="w-[18px] h-[18px]" />
              </a>
              <a
                href={`https://wa.me/${CLINIC.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-white/10 text-white hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Horarios</div>
            <ul className="space-y-1.5 text-pink-200">
              {SCHEDULE.map((d) => (
                <li key={d.dayName} className="flex justify-between gap-6 max-w-xs">
                  <span>{d.dayName}</span>
                  <span className="font-mono text-xs">{d.open && d.close ? `${d.open} - ${d.close}` : 'Cerrado'}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Contacto</div>
            <ul className="space-y-2.5 text-pink-200">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-pink-300 shrink-0" />
                <a href={CLINIC.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {CLINIC.fullAddress}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-pink-300 shrink-0" />
                <a href={`tel:${CLINIC.phone.replace(/\D/g, '')}`} className="hover:text-white">
                  {CLINIC.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4 text-pink-300 shrink-0" />
                <a href={`https://wa.me/${CLINIC.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {CLINIC.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <InstagramIcon className="w-4 h-4 text-pink-300 shrink-0" />
                <a href={CLINIC.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {CLINIC.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-xs text-pink-300">
          © {new Date().getFullYear()} {CLINIC.name} · {CLINIC.locality}, {CLINIC.province}
        </div>
      </div>
    </footer>
  );
};
