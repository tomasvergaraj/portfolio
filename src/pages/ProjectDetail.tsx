import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Key } from 'lucide-react';
import projectsData from '../data/projects.json';
import { Project } from '../types';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const projects = projectsData.projects as Project[];
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Botón volver */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/projects"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver a Proyectos
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
              {project.title}
            </h1>
            <span className="px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-semibold">
              {project.category}
            </span>
          </div>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Ver Demo
            </a>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary group"
            >
              <Github className="w-5 h-5 mr-2" />
              Ver Código
            </a>
          </div>
        </motion.div>

        {/* Galería de imágenes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <img
                src={project.gallery[0]}
                alt={`${project.title} - imagen principal`}
                className="w-full h-96 object-cover rounded-xl shadow-2xl"
              />
            </div>
            {project.gallery.slice(1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${project.title} - imagen ${index + 2}`}
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Descripción */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Sobre el Proyecto
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.fullDescription}
              </p>
            </motion.section>

            {/* Problema y solución */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                  El Problema
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {project.problem}
                </p>
              </div>
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                  La Solución
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {project.solution}
                </p>
              </div>
            </motion.section>

            {/* Características */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Características Principales
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tecnologías */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="card p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Tecnologías Utilizadas
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Enlaces */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Enlaces
              </h3>
              <div className="space-y-3">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Ver Demo en Vivo</span>
                </a>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Ver Código Fuente</span>
                </a>
              </div>
            </motion.div>

            {/* Credenciales de Demo */}
            {project.demoCredentials && project.demoCredentials.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="card p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800"
              >
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Key className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  Credenciales de Demo
                </h3>
                <div className="space-y-3">
                  {project.demoCredentials.map((cred, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-amber-200 dark:border-amber-700"
                    >
                      <div className="font-semibold text-amber-700 dark:text-amber-300 text-sm mb-1">
                        {cred.role}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300 text-sm">
                        <span className="font-mono">{cred.email}</span>
                      </div>
                      <div className="text-gray-500 dark:text-gray-400 text-sm">
                        Contraseña: <span className="font-mono">{cred.password}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: project.demoCredentials ? 0.6 : 0.5 }}
              className="card p-6 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 border-primary-200 dark:border-primary-800"
            >
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                ¿Te gustó este proyecto?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Trabajemos juntos en tu próxima idea
              </p>
              <Link to="/contact" className="btn-primary w-full text-center block">
                Contactar
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
