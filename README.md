# efitness - Página Web

Página web elegante y moderna para efitness, tu tienda de suplementos deportivos y accesorios.

## 🚀 Características

- ✨ Diseño elegante y poderoso
- 🎬 Soporte para videos de fondo
- 🖼️ Imágenes de fondo en secciones
- 🎨 Iconos SVG personalizados
- 📱 Totalmente responsive
- ⚡ Animaciones suaves y profesionales
- 🎯 Carrusel de promociones interactivo

## 📁 Estructura de Archivos

```
efitness/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript
├── images/            # Carpeta para imágenes y videos
│   └── README.md      # Guía detallada para agregar imágenes
└── README.md          # Este archivo
```

## 🎬 Cómo Agregar Videos e Imágenes

### Paso 1: Agregar Video de Fondo (Hero Section)

1. Coloca tu video en la carpeta `images/` con el nombre `hero-video.mp4`
2. En `index.html`, busca la línea comentada del video (línea ~33)
3. Descomenta las líneas del video:
   ```html
   <video class="hero-video" autoplay muted loop playsinline>
       <source src="images/hero-video.mp4" type="video/mp4">
   </video>
   ```

### Paso 2: Agregar Imágenes de Fondo

Coloca tus imágenes en la carpeta `images/` con estos nombres:

- **hero-bg.jpg** - Fondo del hero (si no usas video)
- **products-bg.jpg** - Fondo de la sección de productos
- **promotions-bg.jpg** - Fondo de la sección de promociones

Las imágenes se aplicarán automáticamente. Si no agregas una imagen, la sección usará el fondo por defecto.

### Paso 3: Iconos Personalizados (Opcional)

Los iconos SVG ya están incluidos y se ven elegantes. Si prefieres usar iconos PNG:

1. Crea iconos PNG (100x100px recomendado)
2. Nómbralos: `supplements-icon.png`, `bottle-icon.png`, `accessories-icon.png`
3. En `index.html`, descomenta las líneas de imagen y comenta las de SVG

## 🎨 Personalización

### Colores

Los colores principales están definidos en `styles.css`:

```css
--primary-color: #0066ff;      /* Azul principal */
--primary-dark: #0052cc;       /* Azul oscuro */
--primary-light: #3399ff;      /* Azul claro */
--secondary-color: #000000;    /* Negro */
--accent-color: #ffffff;        /* Blanco */
```

### Contenido

Edita el contenido directamente en `index.html`:
- Textos de secciones
- Información de contacto
- Promociones y precios
- Títulos y descripciones

## 📱 Responsive

La página está optimizada para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1200px+)

## 🌐 Navegadores Soportados

- Chrome (últimas versiones)
- Firefox (últimas versiones)
- Safari (últimas versiones)
- Edge (últimas versiones)

## 📝 Notas

- Los videos deben ser MP4 para máxima compatibilidad
- Optimiza las imágenes antes de agregarlas (recomendado: < 500KB cada una)
- El video del hero se reproduce automáticamente en loop y está silenciado
- Si no agregas imágenes/videos, la página funcionará con los fondos por defecto

## 🎯 Próximos Pasos

1. Agrega tus imágenes y videos en la carpeta `images/`
2. Personaliza los textos y precios en `index.html`
3. Actualiza la información de contacto
4. ¡Listo para publicar!

---

**Desarrollado con ❤️ para efitness**

