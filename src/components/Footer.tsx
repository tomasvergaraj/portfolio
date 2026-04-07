import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/tomasvergaraj', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/tomas-vergara-5ba752216/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:tomas.d.v.j@hotmail.com', label: 'Email' },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1 - Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 gradient-text">Portfolio</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Desarrollador Full Stack apasionado por crear experiencias web excepcionales
              con las últimas tecnologías.
            </p>
          </div>

          {/* Columna 2 - Links rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="/projects"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  Proyectos
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  Sobre mí
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3 - Redes sociales */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
              Conecta Conmigo
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-white dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all transform hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center gap-2">
            © {currentYear} Portfolio. Hecho con <Heart className="w-4 h-4 text-red-500 fill-current" /> y React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
