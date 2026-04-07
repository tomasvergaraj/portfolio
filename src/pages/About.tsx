import { motion } from 'framer-motion';
import { Code2, Palette, Database, Wrench, Award, Briefcase, Download } from 'lucide-react';

const About = () => {
  const skills = [
    {
      category: 'Frontend',
      icon: Palette,
      items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux', 'Vue.js'],
    },
    {
      category: 'Backend',
      icon: Database,
      items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Prisma'],
    },
    {
      category: 'Herramientas',
      icon: Wrench,
      items: ['Git', 'Docker', 'AWS', 'Vercel', 'Postman'],
    },
  ];

  const experience = [
    {
      role: 'Junior Full Stack Developer',
      company: 'HBQP',
      period: '2025 - Presente',
      description: 'Desarrollo de aplicaciones web escalables con React y Node.js.',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="section-title mb-6">Sobre Mí</h1>
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-400 to-purple-600 p-1">
                <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <Code2 className="w-16 h-16 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-primary-600 text-white rounded-full p-2">
                <Award className="w-6 h-6" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              ¡Hola! 👋
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Soy un desarrollador full stack apasionado por crear experiencias web excepcionales.
                Con más de 3 años de experiencia en la industria, he tenido el privilegio de trabajar
                en proyectos diversos.
              </p>
              <p>
                Mi enfoque se centra en escribir código limpio, mantenible y escalable, siempre
                buscando las mejores prácticas y las tecnologías más modernas. Me encanta resolver
                problemas complejos y transformar ideas en productos digitales que las personas aman usar.
              </p>
              <p>
                Cuando no estoy programando, puedes encontrarme aprendiendo nuevas tecnologías,
                contribuyendo a proyectos de código abierto.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
            Habilidades Técnicas
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                    <skillGroup.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {skillGroup.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experiencia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
            Experiencia Profesional
          </h2>
          <div className="space-y-8">
            {experience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8 border-l-2 border-primary-600 dark:border-primary-400"
              >
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary-600 dark:bg-primary-400" />
                <div className="card p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <Briefcase className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {job.role}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-3">
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">
                      {job.company}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {job.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="card p-12 max-w-2xl mx-auto bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 border-primary-200 dark:border-primary-800">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              ¿Quieres saber más?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Descarga mi CV o contáctame directamente
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/CV.pdf" 
                download="CV-Tomas-Vergara.pdf"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Descargar CV
              </a>
              <a href="/contact" className="btn-secondary">
                Contactar
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
