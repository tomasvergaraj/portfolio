import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import projectsData from '../data/projects.json';
import { Project } from '../types';
import { usePageTitle } from '../hooks/usePageTitle';

const featuredOrder = [
  'nexo-fitness',
  'arcade-invaders',
  'sistema-sumariales',
  'minimarket-pos',
];

const Projects = () => {
  usePageTitle('Proyectos');

  const [filter, setFilter] = useState<string>('all');
  const projects = projectsData.projects as Project[];

  const sortedProjects = [...projects].sort((a, b) => {
    const aPriority = featuredOrder.indexOf(a.slug);
    const bPriority = featuredOrder.indexOf(b.slug);
    if (aPriority === -1 && bPriority === -1) return 0;
    if (aPriority === -1) return 1;
    if (bPriority === -1) return -1;
    return aPriority - bPriority;
  });

  const categories = ['all', ...Array.from(new Set(sortedProjects.map((project) => project.category)))];

  const filteredProjects =
    filter === 'all'
      ? sortedProjects
      : sortedProjects.filter((project) => project.category === filter);

  return (
    <div className="pt-32 pb-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20 max-w-3xl"
        >
          <p className="eyebrow mb-6">Proyectos</p>
          <h1 className="text-h1 font-medium tracking-tight text-ink-900 dark:text-ink-50 mb-6">
            Una colección de trabajo reciente.
          </h1>
          <p className="text-lg text-ink-600 dark:text-ink-300 leading-relaxed">
            Aplicaciones web completas, productos SaaS y herramientas
            especializadas — desde clientes reales hasta proyectos personales.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-1 mb-16 border-b border-ink-200 dark:border-ink-800"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`relative px-4 py-3 font-mono text-sm uppercase tracking-wider transition-colors ${
                filter === category
                  ? 'text-ink-900 dark:text-ink-100'
                  : 'text-ink-500 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-100'
              }`}
            >
              {category === 'all' ? 'Todos' : category}
              {filter === category && (
                <motion.div
                  layoutId="projects-tab-indicator"
                  className="absolute -bottom-px left-0 right-0 h-px bg-ink-900 dark:bg-ink-100"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-ink-500 dark:text-ink-400">
              No hay proyectos en esta categoría.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
