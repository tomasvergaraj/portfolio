import type { KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const navigate = useNavigate();
  const projectDetailPath = `/projects/${project.slug}`;

  const handleOpenDetail = () => {
    navigate(projectDetailPath);
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigate(projectDetailPath);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 dark:focus-visible:ring-ink-100 focus-visible:ring-offset-4 focus-visible:ring-offset-paper dark:focus-visible:ring-offset-paper-dark rounded-2xl"
      role="link"
      tabIndex={0}
      onClick={handleOpenDetail}
      onKeyDown={handleCardKeyDown}
      aria-label={`Ver detalles de ${project.title}`}
    >
      <div className="relative overflow-hidden aspect-[4/3] rounded-2xl border border-ink-200 dark:border-ink-800 bg-ink-100 dark:bg-ink-900 mb-5">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>

      <div>
        <p className="font-mono text-xs text-ink-500 dark:text-ink-400 mb-2">
          {project.category}
        </p>
        <h3 className="text-xl font-medium text-ink-900 dark:text-ink-50 mb-2 group-hover:underline underline-offset-4 decoration-ink-300">
          {project.title}
        </h3>
        <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.shortDescription}
        </p>
        <p className="font-mono text-xs text-ink-500 dark:text-ink-400">
          {project.technologies.slice(0, 4).join(' · ')}
          {project.technologies.length > 4 && ` · +${project.technologies.length - 4}`}
        </p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
