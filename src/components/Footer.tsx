import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/tomasvergaraj', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/tomas-vergara-5ba752216/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contacto@nexosoftware.cl', label: 'Email' },
  ];

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/projects', label: 'Proyectos' },
    { to: '/about', label: 'Sobre mí' },
    { to: '/contact', label: 'Contacto' },
  ];

  return (
    <footer className="border-t border-ink-200 dark:border-ink-800 mt-32">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <p className="eyebrow mb-4">Tomas Vergara</p>
            <p className="text-ink-700 dark:text-ink-300 max-w-md leading-relaxed">
              Desarrollador full stack y fundador de{' '}
              <a
                href="https://nexosoftware.cl/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-900 dark:text-ink-100 underline underline-offset-4 decoration-ink-300 hover:decoration-ink-900 dark:hover:decoration-ink-100"
              >
                Nexo Software SpA
              </a>
              . Software a medida y productos SaaS.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4">Navegación</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-ink-700 dark:text-ink-300 hover:text-ink-900 dark:hover:text-ink-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ink-200 dark:border-ink-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="font-mono text-xs text-ink-500 dark:text-ink-400">
            © {currentYear} · Quillota, Chile
          </p>
          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-ink-500 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-100 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
