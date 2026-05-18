import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Github, Key } from 'lucide-react';
import projectsData from '../data/projects.json';
import { Project } from '../types';
import { usePageTitle } from '../hooks/usePageTitle';
import { getTechIcon } from '../data/techIcons';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const projects = projectsData.projects as Project[];
  const project = projects.find((p) => p.slug === slug);

  usePageTitle(project?.title);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="pt-32 pb-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-mono text-sm text-ink-500 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a proyectos
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-4xl"
        >
          <p className="eyebrow mb-6">{project.category}</p>
          <h1 className="text-h1 font-medium tracking-tight text-ink-900 dark:text-ink-50 mb-6">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-ink-600 dark:text-ink-300 leading-relaxed max-w-prose-narrow mb-10">
            {project.shortDescription}
          </p>
          <div className="flex flex-wrap gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Ver demo
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Github className="w-4 h-4" />
                Ver código
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-24 space-y-4"
        >
          <div className="overflow-hidden rounded-2xl border border-ink-200 dark:border-ink-800 bg-ink-100 dark:bg-ink-900">
            <img
              src={project.gallery[0]}
              alt={`${project.title} — vista principal`}
              className="w-full aspect-[16/9] object-cover"
            />
          </div>
          {project.gallery.length > 1 && (
            <div className="grid md:grid-cols-2 gap-4">
              {project.gallery.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-ink-200 dark:border-ink-800 bg-ink-100 dark:bg-ink-900"
                >
                  <img
                    src={image}
                    alt={`${project.title} — vista ${index + 2}`}
                    className="w-full aspect-[4/3] object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-20">
            <section>
              <p className="eyebrow mb-6">Sobre el proyecto</p>
              <p className="text-lg text-ink-700 dark:text-ink-200 leading-relaxed max-w-prose-narrow">
                {project.fullDescription}
              </p>
            </section>

            <section className="grid md:grid-cols-2 gap-12 pt-16 border-t border-ink-200 dark:border-ink-800">
              <div>
                <p className="eyebrow mb-4">El problema</p>
                <p className="text-ink-700 dark:text-ink-200 leading-relaxed">
                  {project.problem}
                </p>
              </div>
              <div>
                <p className="eyebrow mb-4">La solución</p>
                <p className="text-ink-700 dark:text-ink-200 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </section>

            <section className="pt-16 border-t border-ink-200 dark:border-ink-800">
              <p className="eyebrow mb-8">Características</p>
              <ul className="space-y-4">
                {project.features.map((feature, index) => (
                  <li
                    key={index}
                    className="grid grid-cols-12 gap-4 pb-4 border-b border-ink-200 dark:border-ink-800 last:border-b-0"
                  >
                    <span className="col-span-1 font-mono text-xs text-ink-500 dark:text-ink-400 pt-1">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="col-span-11 text-ink-800 dark:text-ink-100">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-12">
            <div>
              <p className="eyebrow mb-4">Stack</p>
              <ul className="space-y-2">
                {project.technologies.map((tech) => {
                  const icon = getTechIcon(tech);
                  return (
                    <li
                      key={tech}
                      className="flex items-center gap-3 text-ink-800 dark:text-ink-100 border-b border-ink-200 dark:border-ink-800 py-2"
                    >
                      {icon && (
                        <img
                          src={icon}
                          alt=""
                          className="w-4 h-4 object-contain shrink-0"
                          loading="lazy"
                          aria-hidden="true"
                        />
                      )}
                      {tech}
                    </li>
                  );
                })}
              </ul>
            </div>

            {project.demoCredentials && project.demoCredentials.length > 0 && (
              <div>
                <p className="eyebrow mb-4 flex items-center gap-2">
                  <Key className="w-3.5 h-3.5" />
                  Credenciales de demo
                </p>
                <div className="space-y-4">
                  {project.demoCredentials.map((cred, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl border border-ink-200 dark:border-ink-800"
                    >
                      <p className="font-mono text-xs uppercase tracking-wider text-ink-500 dark:text-ink-400 mb-2">
                        {cred.role}
                      </p>
                      <p className="font-mono text-sm text-ink-800 dark:text-ink-100">
                        {cred.email}
                      </p>
                      <p className="font-mono text-sm text-ink-500 dark:text-ink-400">
                        {cred.password}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-8 border-t border-ink-200 dark:border-ink-800">
              <p className="text-ink-700 dark:text-ink-200 mb-4 max-w-prose-narrow">
                ¿Te interesa un proyecto similar?
              </p>
              <Link to="/contact" className="btn-primary w-full sm:w-auto">
                Contactar
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
