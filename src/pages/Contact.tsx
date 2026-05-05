import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, ArrowUpRight, Github, Linkedin, Instagram } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { ContactFormData } from '../types';
import { usePageTitle } from '../hooks/usePageTitle';

const Contact = () => {
  usePageTitle('Contacto');

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          reply_to: formData.email,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error al enviar email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'contacto@nexosoftware.cl', href: 'mailto:contacto@nexosoftware.cl' },
    { icon: Phone, label: 'Teléfono', value: '+56 9 8196 4119', href: 'tel:+56981964119' },
    { icon: MapPin, label: 'Ubicación', value: 'Quillota, Chile', href: null as string | null },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/tomasvergaraj', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/tomas-vergara-5ba752216/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/tomasvergar4/', label: 'Instagram' },
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-24 max-w-3xl"
        >
          <p className="eyebrow mb-6">Contacto</p>
          <h1 className="text-h1 font-medium tracking-tight text-ink-900 dark:text-ink-50 mb-6">
            Conversemos sobre tu proyecto.
          </h1>
          <p className="text-lg text-ink-600 dark:text-ink-300 leading-relaxed max-w-prose-narrow">
            ¿Tienes una idea o necesitas software a medida? Escríbeme directamente
            o cotiza con{' '}
            <a
              href="https://nexosoftware.cl/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-900 dark:text-ink-100 underline underline-offset-4 decoration-ink-300 hover:decoration-ink-900 dark:hover:decoration-ink-100"
            >
              Nexo Software
            </a>
            .
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 space-y-12"
          >
            <div>
              <p className="eyebrow mb-6">Datos directos</p>
              <ul className="space-y-4">
                {contactInfo.map((info) => (
                  <li key={info.label} className="flex items-start gap-3">
                    <info.icon className="w-4 h-4 mt-1 text-ink-500 dark:text-ink-400 flex-shrink-0" />
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wider text-ink-500 dark:text-ink-400 mb-0.5">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-ink-900 dark:text-ink-100 hover:underline underline-offset-4"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-ink-900 dark:text-ink-100">{info.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-6">Redes</p>
              <div className="flex gap-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-500 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-100 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-8"
          >
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-mono text-xs uppercase tracking-wider text-ink-500 dark:text-ink-400 mb-2"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="field"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block font-mono text-xs uppercase tracking-wider text-ink-500 dark:text-ink-400 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="field"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block font-mono text-xs uppercase tracking-wider text-ink-500 dark:text-ink-400 mb-2"
                >
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="field"
                  placeholder="¿De qué quieres hablar?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block font-mono text-xs uppercase tracking-wider text-ink-500 dark:text-ink-400 mb-2"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="field resize-none"
                  placeholder="Cuéntame sobre tu proyecto..."
                />
              </div>

              {submitStatus === 'success' && (
                <p className="font-mono text-sm text-ink-700 dark:text-ink-200 border-l-2 border-ink-900 dark:border-ink-100 pl-4">
                  Mensaje enviado. Te responderé pronto.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="font-mono text-sm text-ink-700 dark:text-ink-200 border-l-2 border-red-500 pl-4">
                  Hubo un error. Intenta nuevamente o escríbeme directo a contacto@nexosoftware.cl
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin" />
                    Enviando
                  </>
                ) : (
                  <>
                    Enviar mensaje
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
