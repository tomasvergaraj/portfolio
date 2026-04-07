# 🚀 Guía de Inicio Rápido

## Paso 1: Instalación

```bash
# Instalar dependencias
npm install
```

## Paso 2: Iniciar Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
```

Abre tu navegador en `http://localhost:3000`

## Paso 3: Personalizar

### Datos Personales

1. **Home (`src/pages/Home.tsx`)**
   - Línea 50: Cambia el título y descripción
   - Línea 67: Modifica el call to action

2. **About (`src/pages/About.tsx`)**
   - Línea 40-48: Edita tu biografía
   - Línea 15-25: Actualiza tus skills

3. **Contact (`src/pages/Contact.tsx`)**
   - Línea 27-39: Actualiza tu información de contacto
   - Línea 41-45: Modifica tus redes sociales

### Proyectos

Edita `src/data/projects.json`:

```json
{
  "id": 1,
  "title": "Mi Proyecto",
  "slug": "mi-proyecto",
  "shortDescription": "Breve descripción",
  ...
}
```

### Colores

Edita `tailwind.config.js`:

```javascript
colors: {
  primary: {
    600: '#TU_COLOR',
    // ...
  }
}
```

## Paso 4: Build para Producción

```bash
# Crear build optimizado
npm run build

# Preview del build
npm run preview
```

## Paso 5: Deploy

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

## 📝 Checklist de Personalización

- [ ] Cambiar nombre y descripción en Home
- [ ] Actualizar biografía en About
- [ ] Modificar información de contacto
- [ ] Agregar tus proyectos en projects.json
- [ ] Reemplazar imágenes de ejemplo
- [ ] Personalizar colores del tema
- [ ] Actualizar meta tags en index.html
- [ ] Agregar tu CV para descarga
- [ ] Configurar formulario de contacto (backend)
- [ ] Probar en diferentes dispositivos

## 🆘 Problemas Comunes

### Error: Cannot find module
```bash
rm -rf node_modules package-lock.json
npm install
```

### Puerto 3000 en uso
Edita `vite.config.ts`:
```typescript
server: {
  port: 3001, // Cambia el puerto
}
```

### Estilos de Tailwind no funcionan
```bash
npm run dev
# Recarga el navegador con Ctrl+Shift+R
```

## 📚 Recursos Útiles

- [Documentación React](https://react.dev/)
- [Documentación Tailwind](https://tailwindcss.com/docs)
- [Documentación Vite](https://vitejs.dev/)
- [Framer Motion](https://www.framer.com/motion/)

¡Disfruta construyendo tu portafolio! 🎉
