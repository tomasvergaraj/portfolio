import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import projectsData from '../data/projects.json';
import { Project } from '../types';
import { usePageTitle } from '../hooks/usePageTitle';

const FEATURED_SLUGS = ['nexo-fitness', 'arcade-invaders', 'sistema-sumariales'];

const Home = () => {
  usePageTitle();

  const projects = projectsData.projects as Project[];
  const featured = FEATURED_SLUGS
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project));

  return (
    <div>
      <section className="pt-40 pb-32">
        <div className="container-custom">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-10"
          >
            Quillota, Chile · {new Date().getFullYear()}
          </motion.p>

          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="lg:col-span-8"
            >
              <h1 className="text-display font-medium tracking-tight text-ink-900 dark:text-ink-50">
                Tomas Vergara,<br />
                <span className="text-ink-500 dark:text-ink-400">desarrollador full stack.</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-4 hidden lg:block"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-ink-200 dark:border-ink-800">
                <img
                  src="/profile.jpg"
                  alt="Tomas Vergara"
                  className="w-full h-full object-cover grayscale"
                  loading="eager"
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-16 grid lg:grid-cols-12 gap-12"
          >
            <p className="lg:col-span-7 lg:col-start-1 text-lg md:text-xl text-ink-700 dark:text-ink-300 leading-relaxed max-w-prose-narrow">
              Construyo software a medida desde{' '}
              <a
                href="https://nexosoftware.cl/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-900 dark:text-ink-100 underline underline-offset-4 decoration-ink-300 hover:decoration-ink-900 dark:hover:decoration-ink-100"
              >
                Nexo Software SpA
              </a>
              . Foco en aplicaciones web modernas con React, TypeScript y Node.js.
              Mi primer producto SaaS,{' '}
              <a
                href="https://nexofitness.cl/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-900 dark:text-ink-100 underline underline-offset-4 decoration-ink-300 hover:decoration-ink-900 dark:hover:decoration-ink-100"
              >
                Nexo Fitness
              </a>
              , está en producción ayudando a gimnasios.
            </p>

            <div className="lg:col-span-5 flex flex-wrap gap-3 lg:justify-end items-end">
              <Link to="/projects" className="btn-primary">
                Ver proyectos
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Contactar
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 border-t border-ink-200 dark:border-ink-800">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-16 gap-6">
            <div>
              <p className="eyebrow mb-4">Trabajo seleccionado</p>
              <h2 className="text-h2 font-medium max-w-xl">
                Una muestra de proyectos recientes.
              </h2>
            </div>
            <Link
              to="/projects"
              className="hidden md:inline-flex items-center gap-2 font-mono text-sm text-ink-600 dark:text-ink-300 hover:text-ink-900 dark:hover:text-ink-100"
            >
              Todos los proyectos
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-20">
            {featured.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
              >
                <Link
                  to={`/projects/${project.slug}`}
                  className="group grid md:grid-cols-12 gap-8 items-center"
                >
                  <div className="md:col-span-7 overflow-hidden rounded-2xl border border-ink-200 dark:border-ink-800 bg-ink-100 dark:bg-ink-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                  <div className="md:col-span-5">
                    <p className="font-mono text-xs text-ink-500 dark:text-ink-400 mb-3">
                      {String(index + 1).padStart(2, '0')} · {project.category}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-ink-900 dark:text-ink-50 mb-3 group-hover:underline underline-offset-4 decoration-ink-300">
                      {project.title}
                    </h3>
                    <p className="text-ink-600 dark:text-ink-300 leading-relaxed mb-4">
                      {project.shortDescription}
                    </p>
                    <p className="font-mono text-xs text-ink-500 dark:text-ink-400">
                      {project.technologies.slice(0, 4).join(' · ')}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 border-t border-ink-200 dark:border-ink-800">
        <div className="container-custom max-w-3xl">
          <p className="eyebrow mb-6">Trabajemos juntos</p>
          <h2 className="text-h2 font-medium mb-8 max-w-2xl">
            ¿Tienes una idea? Conversemos sobre cómo construirla.
          </h2>
          <Link to="/contact" className="btn-primary">
            Empezar conversación
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
