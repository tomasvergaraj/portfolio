import { getTechIcon } from '../data/techIcons';

interface TechBadgesProps {
  technologies: string[];
  /** Mostrar sólo las primeras N. Si hay más, se muestra "+X". */
  max?: number;
  /** Tamaño: "sm" para tarjetas, "md" para listas de detalle. */
  size?: 'sm' | 'md';
}

const sizeClasses = {
  sm: {
    badge: 'text-xs px-2 py-1',
    icon: 'w-3.5 h-3.5',
  },
  md: {
    badge: 'text-sm px-3 py-1.5',
    icon: 'w-4 h-4',
  },
};

/**
 * Renderiza un set de tecnologías como badges con el logo oficial al lado del nombre.
 * Las tecnologías sin logo en el mapa se muestran como texto plano (mismo badge).
 */
const TechBadges = ({ technologies, max, size = 'sm' }: TechBadgesProps) => {
  const visible = max ? technologies.slice(0, max) : technologies;
  const overflow = max ? Math.max(0, technologies.length - max) : 0;
  const s = sizeClasses[size];

  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((tech) => {
        const icon = getTechIcon(tech);
        return (
          <span
            key={tech}
            className={`inline-flex items-center gap-1.5 rounded-full border border-ink-200 dark:border-ink-800 text-ink-700 dark:text-ink-200 font-mono ${s.badge}`}
          >
            {icon && (
              <img
                src={icon}
                alt=""
                className={`${s.icon} object-contain shrink-0`}
                loading="lazy"
                aria-hidden="true"
              />
            )}
            {tech}
          </span>
        );
      })}
      {overflow > 0 && (
        <span
          className={`inline-flex items-center rounded-full border border-ink-200 dark:border-ink-800 text-ink-500 dark:text-ink-400 font-mono ${s.badge}`}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
};

export default TechBadges;
