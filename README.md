# 🚀 Portfolio Profesional - React + TypeScript

Un portafolio moderno, responsive y profesional desarrollado con las últimas tecnologías web.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.1.0-646CFF?logo=vite)

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz limpia y profesional con animaciones suaves
- 🌓 **Modo Oscuro**: Tema claro/oscuro con persistencia en localStorage
- 📱 **Totalmente Responsive**: Optimizado para desktop, tablet y móvil
- ⚡ **Rendimiento Óptimo**: Construido con Vite para carga ultrarrápida
- 🎭 **Animaciones Fluidas**: Implementadas con Framer Motion
- ♿ **Accesibilidad**: Cumple con estándares WCAG
- 🔍 **SEO Friendly**: Estructura semántica y metadatos optimizados

## 🛠️ Tecnologías Utilizadas

### Core
- **React 18.2** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server

### Estilos
- **Tailwind CSS** - Framework de utilidades CSS
- **Framer Motion** - Animaciones y transiciones

### Routing & Icons
- **React Router DOM** - Navegación SPA
- **Lucide React** - Iconos modernos

## 📁 Estructura del Proyecto

```
portfolio/
├── public/              # Archivos estáticos
├── src/
│   ├── components/      # Componentes reutilizables
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ProjectCard.tsx
│   ├── pages/           # Páginas de la aplicación
│   │   ├── Home.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   ├── data/            # Datos de proyectos
│   │   └── projects.json
│   ├── hooks/           # Custom hooks
│   │   └── useDarkMode.ts
│   ├── types/           # Tipos TypeScript
│   │   └── index.ts
│   ├── App.tsx          # Componente principal
│   ├── main.tsx         # Punto de entrada
│   └── index.css        # Estilos globales
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/usuario/portfolio.git
cd portfolio
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Iniciar servidor de desarrollo**
```bash
npm run dev
# o
yarn dev
```

El proyecto estará disponible en `http://localhost:3000`

### Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Crea build de producción
npm run preview  # Preview del build de producción
npm run lint     # Ejecuta el linter
```

## 📝 Personalización

### 1. Información Personal

Edita los datos en las páginas para agregar tu información:

- **Home.tsx**: Nombre, rol y descripción
- **About.tsx**: Biografía, skills y experiencia
- **Contact.tsx**: Email, teléfono y redes sociales

### 2. Proyectos

Edita `src/data/projects.json` para agregar tus propios proyectos:

```json
{
  "id": 1,
  "title": "Nombre del Proyecto",
  "slug": "nombre-proyecto",
  "shortDescription": "Descripción corta",
  "fullDescription": "Descripción completa",
  "problem": "Problema que resuelve",
  "solution": "Cómo lo resuelve",
  "technologies": ["React", "Node.js"],
  "features": ["Feature 1", "Feature 2"],
  "image": "url-imagen",
  "gallery": ["url1", "url2"],
  "demoUrl": "https://demo.com",
  "repoUrl": "https://github.com/usuario/repo",
  "category": "Full Stack"
}
```

### 3. Colores y Tema

Modifica `tailwind.config.js` para personalizar la paleta de colores:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Tus colores personalizados
      }
    }
  }
}
```

### 4. Imágenes

Reemplaza las URLs de Unsplash en `projects.json` con tus propias imágenes.

## 🎨 Componentes Principales

### Navbar
- Navegación responsive
- Toggle de tema oscuro
- Menú móvil animado
- Indicador de ruta activa

### ProjectCard
- Tarjetas de proyecto con hover effects
- Links a demo y código
- Categorías y tecnologías
- Optimización de imágenes

### Footer
- Links rápidos
- Redes sociales
- Información de contacto
- Copyright dinámico

## 🔧 Configuración de Producción

### Build

```bash
npm run build
```

Esto genera una carpeta `dist/` optimizada para producción.

### Deploy

#### Vercel (Recomendado)
```bash
npm i -g vercel
vercel
```

#### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

#### GitHub Pages
1. Instala `gh-pages`:
```bash
npm install --save-dev gh-pages
```

2. Agrega scripts en `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Deploy:
```bash
npm run deploy
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ♿ Accesibilidad

- Navegación por teclado completa
- Atributos ARIA apropiados
- Contraste de colores WCAG AA
- Texto alternativo en imágenes
- Focus visible en elementos interactivos

## 🌐 SEO

- Meta tags optimizados
- Open Graph tags
- Sitemap.xml
- Robots.txt
- Estructura semántica HTML5

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Contacto

- **Email**: tomas.d.v.j@hotmail.com
- **LinkedIn**: [linkedin.com/in/usuario](https://www.linkedin.com/in/tomas-vergara-5ba752216/)
- **GitHub**: [github.com/usuario](https://github.com/tomasvergaraj)

## 🙏 Agradecimientos

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

⭐ Si te gusta este proyecto, no olvides darle una estrella en GitHub!

Hecho con ❤️ y React
