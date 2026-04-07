// EJEMPLO: Integración con EmailJS (servicio gratuito sin backend)
// Este archivo muestra cómo integrar EmailJS en el componente Contact

/*
PASO 1: Configurar EmailJS

1. Crear cuenta en https://www.emailjs.com/
2. Crear un servicio de email (Gmail, Outlook, etc.)
3. Crear una plantilla de email
4. Obtener tus credenciales:
   - Service ID
   - Template ID
   - Public Key
*/

// PASO 2: Instalar EmailJS
// npm install @emailjs/browser

// PASO 3: Actualizar Contact.tsx

import { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Enviar email usando EmailJS
      await emailjs.send(
        'YOUR_SERVICE_ID',      // Reemplaza con tu Service ID
        'YOUR_TEMPLATE_ID',     // Reemplaza con tu Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'YOUR_PUBLIC_KEY'       // Reemplaza con tu Public Key
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  // ... resto del componente
};

/*
PLANTILLA DE EMAIL EN EMAILJS:

Asunto: Nuevo mensaje de {{from_name}} - {{subject}}

Contenido:
Tienes un nuevo mensaje desde tu portafolio:

Nombre: {{from_name}}
Email: {{from_email}}
Asunto: {{subject}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde tu portafolio web.
*/

/*
ALTERNATIVAS A EMAILJS:

1. FORMSPREE (https://formspree.io/)
   - Muy simple de usar
   - Plan gratuito disponible
   - Solo necesitas un endpoint

   Ejemplo:
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
     <input type="text" name="name" />
     <input type="email" name="email" />
     <textarea name="message"></textarea>
     <button type="submit">Send</button>
   </form>

2. WEB3FORMS (https://web3forms.com/)
   - Completamente gratis
   - Sin límite de envíos
   - API simple

   const handleSubmit = async (e) => {
     e.preventDefault();
     const formData = new FormData(e.target);
     formData.append("access_key", "YOUR_ACCESS_KEY");
     
     const response = await fetch("https://api.web3forms.com/submit", {
       method: "POST",
       body: formData
     });
     
     const data = await response.json();
     // Manejar respuesta
   };

3. GETFORM (https://getform.io/)
   - Plan gratuito con 50 envíos/mes
   - Dashboard para ver mensajes
   - Fácil integración

4. NETLIFY FORMS (si usas Netlify para deploy)
   - Gratis con deploy en Netlify
   - Solo agregar atributo data-netlify="true"
   
   <form name="contact" method="POST" data-netlify="true">
     <input type="hidden" name="form-name" value="contact" />
     // ... campos del formulario
   </form>
*/

// RECOMENDACIÓN:
// Para comenzar rápido sin backend, usa EmailJS o Web3Forms
// Son gratuitos, fáciles de configurar y funcionan perfectamente para portafolios

export {};
