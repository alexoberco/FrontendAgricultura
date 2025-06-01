## Proyecto AgroPrecision

Este repositorio contiene el frontend completo de **AgroPrecision**, una plataforma web de agricultura de precisión que conecta a distintos actores del sector (agricultores, proveedores, especialistas y administradores) mediante interfaces modernas, interacción en tiempo real y simulación de datos. Se ha implementado usando [Astro](https://astro.build/) junto con componentes React para ciertas funcionalidades dinámicas (Islands Architecture).

---

## Resumen del Proyecto

AgroPrecision ofrece las siguientes secciones principales, todas protegidas por un sistema de login simulado y roles almacenados en `localStorage`:

1. **Login / Registro**

   * Páginas independientes para inicio de sesión y registro, con validación básica de usuarios guardados en `src/data/users.js`.

2. **Panel de Agricultor** (`/agricultor`)

   * **Dashboard**: Resumen de sensores, últimas alertas y recomendaciones.
   * **Tienda**: Grid de productos con “Agregar al carrito” (simulado).
   * **Mis Pedidos**: Tabla de pedidos filtrados por usuario.
   * **Monitoreo IoT**: Componente React que muestra datos ficticios de sensores (gráfico de Recharts).
   * **Reportes e IA**: Componente React simula generación de reportes y recomendaciones.
   * **Asesoría Técnica**: Formulario para enviar consultas a un especialista (simulado).
   * **Foro**: Sección general (no solo agricultor) con hilos de discusión.
   * **Solicitudes de Subsidios**: Lista de subsidios (simulado) obtenidos desde `src/data/subsidies.js`.

3. **Panel de Proveedor** (`/proveedor`)

   * **Dashboard**: Resumen de pedidos pendientes, total de productos, productos con bajo stock.
   * **Pedidos de Clientes**: Tabla con todos los pedidos (simulado).
   * **Inventario**: Gestión de stock de productos con inputs para actualizar (simulado).

4. **Panel de Especialista** (`/especialista`)

   * **Consultas Técnicas**: Lista de consultas enviadas por agricultores; permite que el especialista marque como “respondida” y despliegue un área de texto para responder.

5. **Panel de Administrador** (`/administrador`)

   * **Dashboard**: Estadísticas globales (usuarios por rol, pedidos pendientes, subsidios pendientes, preguntas sin respuesta).
   * **Gestión de Usuarios**: Tabla de todos los usuarios, opción para eliminar, formulario para agregar nuevos usuarios (simulado).
   * **Auditoría**: Tabla con logs de actividad extraídos de `src/data/logs.js`.
   * **Solicitudes de Subsidio**: Lista de solicitudes pendientes con botón “Aprobar” (simulado).

Cada una de estas páginas se creó como un archivo `.astro` independiente, importando un componente `<Header>` (React Island) para la barra de navegación, que ajusta sus enlaces según el rol recuperado de `localStorage`. Además, se emplea un sistema simple de guardado/lectura de credenciales en `src/data/users.js`, buscándolas por nombre y contraseña.

---

## Estructura del Repositorio

```
/FrontendAgricultura
├── public
│   ├── styles
│   │   ├── login.css
│   │   ├── register.css
│   │   ├── estilos-agricultor.css
│   │   ├── estilos-proveedor.css
│   │   ├── estilos-especialista.css
│   │   ├── estilos-admin.css
│   │   └── global.css
│   └── ...
│
├── src
│   ├── components
│   │   ├── Header.jsx
│   │   ├── NotificationBell.jsx
│   │   ├── IoTMonitor.jsx
│   │   ├── AIRecommender.jsx
│   │   └── AddToCartButton.jsx
│   │
│   ├── data
│   │   ├── users.js
│   │   ├── orders.js
│   │   ├── products.js
│   │   ├── posts.js
│   │   ├── subsidies.js
│   │   └── logs.js
│   │
│   ├── layouts
│   │   └── MainLayout.astro      (opcional; al final se usaron islas en cada página)
│   │
│   └── pages
│       ├── login.astro
│       ├── register.astro
│       ├── foro.astro
│       │
│       ├── agricultor
│       │   ├── index.astro        (Dashboard Agricultor)
│       │   ├── tienda.astro
│       │   ├── pedidos.astro
│       │   ├── sensores.astro
│       │   ├── reportes.astro
│       │   ├── asesoría.astro
│       │   └── subsidios.astro     (Solicitudes de Subsidio)
│       │
│       ├── proveedor
│       │   ├── index.astro        (Dashboard Proveedor)
│       │   ├── pedidos.astro
│       │   └── inventario.astro
│       │
│       ├── especialista
│       │   └── index.astro        (Consultas Técnicas)
│       │
│       └── administrador
│           ├── index.astro        (Dashboard Admin)
│           ├── usuarios.astro
│           ├── auditoria.astro
│           └── subsidios.astro
│
└── package.json
```

---

## Tecnologías Utilizadas

* **Astro v5.8.1** como framework de frontend estático y SSR minimalista.
* **React v19** para las componentes interactivas (Islands Architecture).
* **Vite** (integrado en Astro) para bundling y hot–reload.
* **Recharts** para gráficos ficticios de sensores IoT.
* **CSS puro (no frameworks)** dividido en archivos según contexto:

  * `login.css` & `register.css`
  * `estilos-agricultor.css`
  * `estilos-proveedor.css`
  * `estilos-especialista.css`
  * `estilos-admin.css`
  * `global.css` (para secciones generales como Foro)

Los datos “dinámicos” (usuarios, productos, pedidos, logs, subsidios, foro) se simulan con archivos JavaScript en `src/data/*.js`. Cualquier acción (enviar consulta, marcar pedido, aprobar subsidio, etc.) aparece mediante `alert()` para mostrar que es una simulación sin backend real.

---

## Instalación y Ejecución Local

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/FrontendAgricultura.git
   cd FrontendAgricultura
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

   Esto descargará `astro`, `@astrojs/react`, `react`, `react-dom`, etc.

3. **Iniciar el servidor de desarrollo**

   ```bash
   npm run dev
   ```

   * Se levantará Astro en modo desarrollo (hot‐reload).
   * Por defecto, estará disponible en `http://localhost:4321/`.

4. **Abrir en el navegador**

   * Navega a `http://localhost:4321/login` para ver la pantalla de Inicio de Sesión.
   * Registra o usa un usuario predefinido (ejemplo: `Alice` / `1234`) para entrar a la sección correspondiente.

     * **Alice** (rol “agricultor”) → `/agricultor`
     * **Bob** (rol “proveedor”) → `/proveedor`
     * **Carol** (rol “especialista”) → `/especialista`
     * **Dave** (rol “administrador”) → `/administrador`

5. **Producción (opcional)**
   Para construir la versión final estática (sin dev toolbar ni hot‐reload):

   ```bash
   npm run build
   npm run preview
   ```

   El comando `build` generará la salida en la carpeta `dist/` y `preview` la servirá localmente.

---

## Estructura de Rutas y Roles

| Ruta                       | Descripción                                       | Rol requerido   |
| -------------------------- | ------------------------------------------------- | --------------- |
| `/login`                   | Pantalla de inicio de sesión                      | `any`           |
| `/register`                | Formulario de registro                            | `any`           |
| `/foro`                    | Foro de discusión general                         | `any`           |
| `/agricultor`              | Dashboard principal de agricultor                 | `agricultor`    |
| `/agricultor/tienda`       | Catálogo de productos                             | `agricultor`    |
| `/agricultor/pedidos`      | Historial de pedidos                              | `agricultor`    |
| `/agricultor/sensores`     | Monitoreo IoT (gráficos)                          | `agricultor`    |
| `/agricultor/reportes`     | Generación de reportes e IA                       | `agricultor`    |
| `/agricultor/asesoria`     | Formulario de asesoría técnica                    | `agricultor`    |
| `/agricultor/subsidios`    | Solicitudes de subsidios (simulado)               | `agricultor`    |
| `/proveedor`               | Dashboard de proveedor                            | `proveedor`     |
| `/proveedor/pedidos`       | Pedidos de clientes                               | `proveedor`     |
| `/proveedor/inventario`    | Gestión de stock de productos                     | `proveedor`     |
| `/especialista`            | Consultas técnicas pendientes (lista + respuesta) | `especialista`  |
| `/administrador`           | Dashboard de administrador                        | `administrador` |
| `/administrador/usuarios`  | Gestión de usuarios (crear/eliminar)              | `administrador` |
| `/administrador/auditoria` | Registro de actividad (logs)                      | `administrador` |
| `/administrador/subsidios` | Aprobación de solicitudes de subsidio             | `administrador` |

---

## Notas Adicionales

* **Control de acceso**
  Cada página valida el rol guardado en `localStorage` al cargarse. Si el valor no coincide, redirige a `/login`. De esta manera, se simula un control de acceso básico sin backend.

* **Estilos**
  Se mantuvo un esquema de colores predominante en tonalidades de verde (login, dashboard agricultor, etc.) para reforzar la identidad agrícola. Cada rol tiene su propio CSS específico (por ejemplo, `estilos-agricultor.css`, `estilos-proveedor.css`, etc.), pero comparten variables comunes para tipografía y spacing.

* **Datos simulados**
  Todos los datos (usuarios, productos, pedidos, subsidios, foro) vienen de archivos JavaScript en `src/data/`. Esto facilita usar datos “mock” sin necesidad de una API real. Para un entorno productivo, bastaría reemplazar estas importaciones por llamadas fetch a un backend.

* **React Islands**
  Solo se hidratan los componentes que requieren interactividad:

  * `Header.jsx` (barra de navegación)
  * `IoTMonitor.jsx` (gráficos de Recharts)
  * `AIRecommender.jsx` (simulación de IA)
  * `NotificationBell.jsx` (campana de notificaciones ficticias)
  * `AddToCartButton.jsx` (simulación de carrito)

* **Plugins e integraciones**

  * `@astrojs/react` para habilitar la isla de React.
  * `Recharts` como dependencia para gráficos en modo “client\:load”.

---

¡Eso es todo! Con este README ya tienes toda la información necesaria para entender la estructura, estilos, dependencias y pasos para ejecutar **AgroPrecision** localmente. ¡Éxitos con tu proyecto!
