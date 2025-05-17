<div align="center">
  <h1>Mercadata</h1>
  <p>Sistema de análisis y seguimiento de compras para mercados</p>
</div>

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Issues](https://img.shields.io/github/issues/np11/mercadata)](https://github.com/np11/mercadata/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/np11/mercadata)](https://github.com/np11/mercadata/pulls)
[![Last Commit](https://img.shields.io/github/last-commit/np11/mercadata)](https://github.com/np11/mercadata/commits/main)
[![CI](https://github.com/np11/mercadata/actions/workflows/ci.yml/badge.svg)](https://github.com/np11/mercadata/actions/workflows/ci.yml)

</div>

## 📋 Descripción

Mercadata es una aplicación web diseñada para realizar un seguimiento detallado de tus compras de mercado, ayudándote a analizar patrones de consumo, gastos y productos más adquiridos. Con un dashboard interactivo, podrás visualizar estadísticas relevantes sobre tus hábitos de compra, facilitando la toma de decisiones financieras y de consumo.

### ✨ Características principales

- **Dashboard analítico**: Visualiza tendencias de gastos y productos más comprados
- **Seguimiento de tickets**: Registra y consulta historial de compras
- **Análisis temporal**: Filtra datos por mes y año para un análisis detallado
- **Visualización de datos**: Gráficos interactivos para una mejor comprensión
- **Interfaz responsiva**: Diseñada para funcionar en cualquier dispositivo

## 🚀 Tecnologías

<div align="center">

[![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![PNPM](https://img.shields.io/badge/PNPM-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![Vuetify](https://img.shields.io/badge/Vuetify-1867C0?style=for-the-badge&logo=vuetify&logoColor=white)](https://vuetifyjs.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)](https://www.chartjs.org/)
[![Pinia](https://img.shields.io/badge/Pinia-FFD43B?style=for-the-badge&logo=pinia&logoColor=black)](https://pinia.vuejs.org/)

</div>

## 🛠️ Instalación y uso

### Requisitos previos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [PNPM](https://pnpm.io/) (v8 o superior)
- [Docker](https://www.docker.com/) (opcional, para despliegue en contenedores)

### Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/np11/mercadata.git
cd mercadata

# Configurar variables de entorno
cd app
cp .env.example .env
# Editar el archivo .env según sea necesario

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

### Usando Docker

```bash
# Desarrollo
docker-compose -f docker-compose.dev.yml up

# Producción
docker-compose up -d
```

## 📊 Estructura del proyecto

El proyecto está organizado en módulos independientes:

- **auth**: Sistema de autenticación y gestión de usuarios
- **dashboard**: Panel principal con gráficos y análisis de datos
- **tickets**: Gestión y visualización de tickets de compra
- **share**: Componentes compartidos y layouts reutilizables

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, lee [CONTRIBUTING.md](CONTRIBUTING.md) para más detalles sobre nuestro código de conducta y el proceso para enviarnos pull requests.

## 📝 Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).
