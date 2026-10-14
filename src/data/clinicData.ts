/**
 * Odonto-Z - datos del consultorio.
 * Fuente: ficha de Google Maps, tarjeta del consultorio e Instagram @odonto._z.
 * Todo lo que se muestra en la web sale de acá: para otro consultorio alcanza con cambiar este archivo.
 */

export const CLINIC = {
  name: 'Odonto-Z',
  initials: 'OZ',
  professional: 'Od. Ayelén Zanatta',
  street: 'Eduardo Madero 1406',
  locality: 'Valentín Alsina',
  province: 'Provincia de Buenos Aires',
  fullAddress: 'Eduardo Madero 1406, Valentín Alsina, Provincia de Buenos Aires',
  phone: '011 5632-1992',
  whatsappNumber: '5491156321992',
  whatsappDisplay: '+54 9 11 5632-1992',
  instagramHandle: '@odonto._z',
  instagramUrl: 'https://www.instagram.com/odonto._z/',
  mapsUrl: 'https://maps.app.goo.gl/KWAsbDLJXN6h2ZRx5',
  coordinates: { lat: -34.6694304, lng: -58.4207656 },
  // Calificación visible en la ficha de Google Maps.
  googleRating: '4.3',
  googleReviews: 7,
  // Foto de la profesional (ruta dentro de /public). Sin foto, se muestran sus iniciales.
  photo: 'images/ayelen.jpg' as string | null,
  // Textos que se repiten en el inicio, el pie y la descripción para Google.
  servicesSummary:
    'limpieza dental, operatorias, tratamientos de conducto, coronas, prótesis, implantes y extracciones',
  // Medios de pago publicados en sus historias de Instagram.
  paymentMethods: ['Transferencia bancaria / Mercado Pago', 'Tarjeta de débito o crédito', 'Efectivo'],
  hoursSummary: 'Lunes a viernes hasta las 17 hs',
  headline: 'Sonreí con',
  headlineHighlight: 'confianza y seguridad',
};

export interface DentalService {
  id: string;
  name: string;
  description: string;
  icon: 'stethoscope' | 'sparkles' | 'layers' | 'shield' | 'activity' | 'smile' | 'crown' | 'anchor' | 'gem';
}

export interface TeamMember {
  role: string;
  /** Nombre y foto: quedan en null hasta que el consultorio los envíe. */
  name: string | null;
  photo: string | null;
}

// Equipo de trabajo del consultorio. Completar nombre y foto de cada integrante.
export const TEAM: TeamMember[] = [
  { role: 'Odontóloga', name: CLINIC.professional, photo: CLINIC.photo },
  { role: 'Recepcionista', name: null, photo: null },
  { role: 'Asistente dental', name: null, photo: null },
];

export const SERVICES: DentalService[] = [
  {
    id: 'limpieza',
    name: 'Limpieza dental',
    description: 'Remoción de sarro y placa para mantener tus encías y tus dientes sanos.',
    icon: 'sparkles',
  },
  {
    id: 'operatoria',
    name: 'Operatoria dental (caries)',
    description: 'Arreglo de caries y restauraciones para devolverle forma y función a tus dientes.',
    icon: 'stethoscope',
  },
  {
    id: 'conducto',
    name: 'Tratamiento de conducto',
    description: 'Endodoncia para conservar tu diente cuando el nervio está afectado.',
    icon: 'activity',
  },
  {
    id: 'exodoncia',
    name: 'Exodoncia',
    description: 'Extracción de piezas dentales cuando es necesaria, con indicaciones claras para el después.',
    icon: 'shield',
  },
  {
    id: 'perno-poste',
    name: 'Perno y poste',
    description: 'Refuerzo interno para reconstruir dientes tratados que perdieron mucha estructura.',
    icon: 'anchor',
  },
  {
    id: 'corona',
    name: 'Corona',
    description: 'Cobertura que restaura la forma, el tamaño y la resistencia de una pieza dental.',
    icon: 'crown',
  },
  {
    id: 'protesis-completa',
    name: 'Prótesis completas',
    description: 'Reposición de todos los dientes de una arcada para recuperar la masticación y la sonrisa.',
    icon: 'layers',
  },
  {
    id: 'protesis-parcial',
    name: 'Prótesis parciales removibles',
    description: 'Reemplazan una o varias piezas, son cómodas y fáciles de higienizar.',
    icon: 'smile',
  },
  {
    id: 'implantes',
    name: 'Implantes',
    description: 'Reposición de piezas dentales con implantes para recuperar la función y la estética.',
    icon: 'gem',
  },
];

export interface ScheduleDay {
  dayName: string;
  dayIndex: number; // 0 = domingo ... 6 = sábado
  open: string | null;
  close: string | null;
}

export const SCHEDULE: ScheduleDay[] = [
  { dayName: 'Lunes', dayIndex: 1, open: '09:30', close: '17:00' },
  { dayName: 'Martes', dayIndex: 2, open: '09:30', close: '17:00' },
  { dayName: 'Miércoles', dayIndex: 3, open: '09:00', close: '17:00' },
  { dayName: 'Jueves', dayIndex: 4, open: '09:30', close: '17:00' },
  { dayName: 'Viernes', dayIndex: 5, open: '09:30', close: '17:00' },
  { dayName: 'Sábado', dayIndex: 6, open: '08:00', close: '13:00' },
  { dayName: 'Domingo', dayIndex: 0, open: null, close: null },
];

const TIME_ZONE = 'America/Argentina/Buenos_Aires';

export interface ClinicStatus {
  isOpen: boolean;
  badge: string;
  detail: string;
}

const toMinutes = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

export function getClinicStatus(now: Date = new Date()): ClinicStatus {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(now);

  const weekday = (parts.find((p) => p.type === 'weekday')?.value || '').toLowerCase().slice(0, 3);
  const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10) % 24;
  const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
  const dayMap: Record<string, number> = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
  const today = dayMap[weekday] ?? now.getDay();
  const minutes = hour * 60 + minute;

  const day = SCHEDULE.find((d) => d.dayIndex === today);
  if (day?.open && day.close) {
    if (minutes >= toMinutes(day.open) && minutes < toMinutes(day.close)) {
      return { isOpen: true, badge: 'Abierto ahora', detail: `Cierra a las ${day.close} hs` };
    }
    if (minutes < toMinutes(day.open)) {
      return { isOpen: false, badge: 'Cerrado ahora', detail: `Abre hoy a las ${day.open} hs` };
    }
  }

  for (let i = 1; i <= 7; i++) {
    const next = SCHEDULE.find((d) => d.dayIndex === (today + i) % 7);
    if (next?.open) {
      const cuando = i === 1 ? 'mañana' : `el ${next.dayName.toLowerCase()}`;
      return { isOpen: false, badge: 'Cerrado por hoy', detail: `Abre ${cuando} a las ${next.open} hs` };
    }
  }
  return { isOpen: false, badge: 'Cerrado ahora', detail: '' };
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${CLINIC.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
