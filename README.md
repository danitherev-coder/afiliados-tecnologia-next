# Innovabyte Affiliate Site

Sitio web de afiliados construido con Next.js, React y TypeScript.

## 🚀 Tecnologías

- **Next.js 14** - Framework de React
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS
- **Lucide React** - Iconos

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start
```

## 🌐 Despliegue

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages.

### Configuración de GitHub Pages

1. Ve a tu repositorio en GitHub
2. Ve a **Settings** > **Pages**
3. En **Source**, selecciona **GitHub Actions**
4. El workflow se ejecutará automáticamente en cada push a la rama `main`

### Configuración del repositorio

Asegúrate de que tu repositorio tenga:
- Rama principal llamada `main`
- GitHub Pages habilitado en la configuración del repositorio
- Permisos de GitHub Actions habilitados

## 📁 Estructura del proyecto

```
├── app/                    # App Router de Next.js
│   ├── components/         # Componentes reutilizables
│   ├── contexts/          # Contextos de React
│   ├── data/              # Datos estáticos
│   └── globals.css        # Estilos globales
├── public/                # Archivos estáticos
└── .github/workflows/     # Workflows de GitHub Actions
```

## 🔧 Configuración

El proyecto está configurado para exportación estática (`output: 'export'`) para compatibilidad con GitHub Pages.

## 📝 Licencia

Este proyecto es privado. 