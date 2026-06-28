# Portal de Tecnólogos Médicos en Radiología

Portal centralizado de acceso a los sistemas del Servicio de Radiodiagnóstico y Ecografía del Hospital Nacional Alberto Sabogal Sologuren.

## Stack Tecnológico

- **React 18**
- **Firebase Firestore** (persistencia de sistemas)
- **Tailwind CSS** (via CDN)
- **GitHub Pages** (hosting)
- **Lucide React** (iconos)

## Características

- 🔗 Cards clickeables a cada sistema
- 🔧 Panel admin oculto (clave: `Essalud2025*`)
- ➕ Agregar, editar y eliminar sistemas dinámicamente
- 🎨 Personalización de iconos y colores por sistema
- 💾 Persistencia en Firebase Firestore

## Sistemas Iniciales

| Sistema | URL |
|---------|-----|
| Producción TM | https://coorditm.github.io/produccion-TM-radiologia/ |
| SSP Portátil | https://coorditm.github.io/ssp-portatil/ |
| Formulario Google | https://docs.google.com/forms/... |

## Configuración Inicial

### 1. Clonar e instalar

```bash
git clone https://github.com/CoordiTM/portal-hnass.git
cd portal-hnass
npm install
```

### 2. Ejecutar en local

```bash
npm start
```

### 3. Despliegue (GitHub Actions automático)

```bash
git add .
git commit -m "Update"
git push origin main
```

El workflow se ejecuta automáticamente. Ve a **Actions** para ver el progreso.

## Panel Admin

1. Click en el icono ⚙️ (esquina superior derecha)
2. Ingresa la clave: `Essalud2025*`
3. Agrega, edita o elimina sistemas

## Estructura

```
.
├── .github/workflows/deploy.yml
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── firebase.js
│   ├── index.css
│   ├── index.js
│   ├── components/
│   │   ├── SystemCard.js
│   │   └── AdminPanel.js
│   └── services/
│       └── dbService.js
├── package.json
└── README.md
```

## Notas

- El portal **no requiere login** para los usuarios finales
- Cada sistema mantiene su propia autenticación
- Los datos se guardan en Firebase Firestore (colección `portal_systems`)
- Si Firestore no está disponible, usa los sistemas por defecto
