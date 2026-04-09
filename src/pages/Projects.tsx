import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import projectsData from '../data/projects.json';
import { Project } from '../types';

const featuredOrder = [
  'nexo-fitness',
  'arcade-invaders',
  'sistema-sumariales',
  'minimarket-pos',
];

const Projects = () => {
  const [filter, setFilter] = useState<string>('all');
  const projects = projectsData.projects as Project[];
  const sortedProjects = [...projects].sort((projectA, projectB) => {
    const projectAPriority = featuredOrder.indexOf(projectA.slug);
    const projectBPriority = featuredOrder.indexOf(projectB.slug);

    if (projectAPriority === -1 && projectBPriority === -1) {
      return 0;
    }

    if (projectAPriority === -1) {
      return 1;
    }

    if (projectBPriority === -1) {
      return -1;
    }

    return projectAPriority - projectBPriority;
  });

  const categories = ['all', ...Array.from(new Set(sortedProjects.map((project) => project.category)))];

  const filteredProjects =
    filter === 'all'
      ? sortedProjects
      : sortedProjects.filter((project) => project.category === filter);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="section-title mb-4">Mis Proyectos</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Una colección de proyectos en los que he trabajado, desde aplicaciones web
            completas hasta componentes y herramientas especializadas.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === category
                  ? 'bg-primary-600 text-white shadow-lg scale-105'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category === 'all' ? 'Todos' : category}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No hay proyectos en esta categoría
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Proyectos Completados', value: '15+' },
            { label: 'Clientes Satisfechos', value: '20+' },
            { label: 'Líneas de Código', value: '50K+' },
            { label: 'Tazas de Café', value: '∞' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
