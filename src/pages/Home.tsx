import { motion } from 'framer-motion';
import { ArrowRight, Code, Palette, Zap, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Código limpio, mantenible y bien documentado siguiendo las mejores prácticas.',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Interfaces modernas y atractivas con excelente experiencia de usuario.',
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Aplicaciones rápidas y optimizadas para el mejor rendimiento.',
    },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/tomasvergaraj', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/tomas-vergara-5ba752216/', label: 'LinkedIn' },
    { icon: Mail, href: '/contact', label: 'Email' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Fondo animado */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-primary-900/20 dark:to-purple-900/20" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-400/30 dark:bg-primary-600/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenido */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-4"
              >
                <span className="px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium">
                  👋 ¡Hola! Bienvenido a mi portafolio
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              >
                Soy{' '}
                <span className="gradient-text">
                  Desarrollador Full Stack
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
              >
                Especializado en crear aplicaciones web modernas y escalables con React, 
                TypeScript y Node.js. Transformo ideas en experiencias digitales excepcionales.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4 mb-8"
              >
                <Link to="/projects" className="btn-primary group">
                  Ver Proyectos
                  <ArrowRight className="inline-block ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Contactar
                </Link>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex gap-4"
              >
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="p-3 rounded-lg bg-white dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all transform hover:scale-110 shadow-md"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </motion.div>
            </motion.div>

            {/* Imagen/Ilustración */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-purple-600 rounded-3xl transform rotate-6 opacity-20 blur-2xl" />
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
                  <div className="space-y-4">
                    {/* Código simulado */}
                    <div className="flex items-center gap-2">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">App.tsx</span>
                    </div>
                    <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-hidden">
                      <code>{`const Portfolio = () => {
  return (
    <div className="amazing">
      <Header />
      <Projects />
      <Contact />
    </div>
  );
};`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="section-title">¿Por qué trabajar conmigo?</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Me enfoco en entregar soluciones de alta calidad que superen las expectativas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-8 text-center group hover:scale-105 transition-transform"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-10" />
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card p-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
              Trabajemos juntos para hacer realidad tus ideas
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center">
              Empecemos a trabajar
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
