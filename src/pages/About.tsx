import { motion } from 'framer-motion';
import { Download, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';

const About = () => {
  usePageTitle('Sobre mí');

  const skills = [
    {
      category: 'Frontend',
      items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'PostgreSQL', 'Prisma'],
    },
    {
      category: 'Herramientas',
      items: ['Git', 'Docker', 'Vercel'],
    },
  ];

  const experience: {
    role: string;
    company: string;
    period: string;
    description: string;
    link?: string;
  }[] = [
    {
      role: 'Fundador & Full Stack Developer',
      company: 'Nexo Software SpA',
      period: '2026 — Presente',
      description:
        'Fundé Nexo Software SpA, empresa enfocada en desarrollo de software a medida. Lancé Nexo Fitness, SaaS para gestión de gimnasios, como primer producto propio.',
      link: 'https://nexosoftware.cl/',
    },
    {
      role: 'Junior Full Stack Developer',
      company: 'HBQP',
      period: '2025 — Presente',
      description: 'Desarrollo de aplicaciones web escalables con React y Node.js.',
    },
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-24 max-w-3xl"
        >
          <p className="eyebrow mb-6">Sobre mí</p>
          <h1 className="text-h1 font-medium tracking-tight text-ink-900 dark:text-ink-50">
            Construyo software con foco en usuarios reales.
          </h1>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid md:grid-cols-12 gap-12 mb-32"
        >
          <div className="md:col-span-3">
            <p className="eyebrow">Bio</p>
          </div>
          <div className="md:col-span-9 space-y-6 text-lg text-ink-700 dark:text-ink-300 leading-relaxed max-w-prose-narrow">
            <p>
              Soy desarrollador full stack y fundador de{' '}
              <a
                href="https://nexosoftware.cl/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-900 dark:text-ink-100 underline underline-offset-4 decoration-ink-300 hover:decoration-ink-900 dark:hover:decoration-ink-100"
              >
                Nexo Software SpA
              </a>
              , empresa enfocada en desarrollo de software a medida para
              empresas que necesitan soluciones digitales reales y mantenibles.
            </p>
            <p>
              Desde Nexo Software construyo proyectos para clientes y también
              productos propios, como{' '}
              <a
                href="https://nexofitness.cl/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-900 dark:text-ink-100 underline underline-offset-4 decoration-ink-300 hover:decoration-ink-900 dark:hover:decoration-ink-100"
              >
                Nexo Fitness
              </a>
              , un SaaS para la gestión integral de gimnasios.
            </p>
            <p>
              Mi enfoque está en escribir código limpio, mantenible y escalable,
              aplicando buenas prácticas y tecnologías modernas para transformar
              ideas en productos digitales que la gente realmente quiere usar.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-12 gap-12 mb-32 pt-16 border-t border-ink-200 dark:border-ink-800"
        >
          <div className="md:col-span-3">
            <p className="eyebrow">Stack</p>
          </div>
          <div className="md:col-span-9 space-y-10">
            {skills.map((group) => (
              <div key={group.category} className="grid sm:grid-cols-12 gap-6 items-baseline">
                <h3 className="sm:col-span-3 font-mono text-sm text-ink-500 dark:text-ink-400 uppercase tracking-wider">
                  {group.category}
                </h3>
                <p className="sm:col-span-9 text-lg text-ink-800 dark:text-ink-100">
                  {group.items.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-12 gap-12 mb-32 pt-16 border-t border-ink-200 dark:border-ink-800"
        >
          <div className="md:col-span-3">
            <p className="eyebrow">Experiencia</p>
          </div>
          <div className="md:col-span-9 space-y-12">
            {experience.map((job, index) => (
              <div key={index} className="grid sm:grid-cols-12 gap-6">
                <div className="sm:col-span-3 font-mono text-sm text-ink-500 dark:text-ink-400">
                  {job.period}
                </div>
                <div className="sm:col-span-9">
                  <h3 className="text-xl font-medium text-ink-900 dark:text-ink-50 mb-1">
                    {job.role}
                  </h3>
                  <div className="mb-3">
                    {job.link ? (
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-ink-700 dark:text-ink-200 underline underline-offset-4 decoration-ink-300 hover:decoration-ink-900 dark:hover:decoration-ink-100"
                      >
                        {job.company}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-ink-700 dark:text-ink-200">{job.company}</span>
                    )}
                  </div>
                  <p className="text-ink-600 dark:text-ink-300 leading-relaxed max-w-prose-narrow">
                    {job.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="pt-16 border-t border-ink-200 dark:border-ink-800"
        >
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <h2 className="text-h2 font-medium tracking-tight text-ink-900 dark:text-ink-50 mb-4">
                ¿Conversamos?
              </h2>
              <p className="text-ink-600 dark:text-ink-300 max-w-prose-narrow">
                Descarga mi CV o escríbeme directamente.
              </p>
            </div>
            <div className="md:col-span-5 flex flex-wrap gap-3 md:justify-end">
              <a
                href="/CV.pdf"
                download="CV-Tomas-Vergara.pdf"
                className="btn-primary"
              >
                <Download className="w-4 h-4" />
                Descargar CV
              </a>
              <Link to="/contact" className="btn-secondary">
                Contactar
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
