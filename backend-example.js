// BACKEND OPCIONAL - Servidor Express simple para el formulario de contacto
// Guardar como: backend/server.js

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configurar transporter de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // o tu servicio de email
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Endpoint para enviar emails
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validación básica
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Todos los campos son requeridos' 
    });
  }

  // Configurar email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // tu email
    subject: `Nuevo mensaje de ${name}: ${subject}`,
    html: `
      <h2>Nuevo mensaje desde tu portafolio</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Asunto:</strong> ${subject}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ 
      success: true, 
      message: 'Email enviado exitosamente' 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al enviar el email' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

/* 
INSTALACIÓN:

1. Crear carpeta backend:
   mkdir backend
   cd backend

2. Instalar dependencias:
   npm init -y
   npm install express cors nodemailer dotenv

3. Crear archivo .env:
   EMAIL_USER=tu-email@gmail.com
   EMAIL_PASS=tu-contraseña-de-aplicacion
   PORT=5000

4. Iniciar servidor:
   node server.js

5. Actualizar Contact.tsx para usar este endpoint:
   const handleSubmit = async (e: FormEvent) => {
     e.preventDefault();
     setIsSubmitting(true);
     
     try {
       const response = await fetch('http://localhost:5000/api/contact', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formData)
       });
       
       const data = await response.json();
       
       if (data.success) {
         setSubmitStatus('success');
         setFormData({ name: '', email: '', subject: '', message: '' });
       } else {
         setSubmitStatus('error');
       }
     } catch (error) {
       setSubmitStatus('error');
     } finally {
       setIsSubmitting(false);
       setTimeout(() => setSubmitStatus('idle'), 5000);
     }
   };

ALTERNATIVAS SIN BACKEND:

1. EmailJS (https://www.emailjs.com/)
2. Formspree (https://formspree.io/)
3. Netlify Forms (si usas Netlify)
4. GetForm (https://getform.io/)
*/
