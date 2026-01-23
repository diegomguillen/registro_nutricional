<div align="center">
  <img src="icon3.png" alt="Logo NutriApp" width="120" />
  <h1>NutriApp</h1>
  <p>
    <strong>Diario Nutricional y Calculadora de Macros</strong>
  </p>
  <p>
    Aplicación Web Progresiva (PWA) para el registro, control y análisis de la ingesta diaria, centrada en la privacidad y el funcionamiento offline.
  </p>
</div>

---
# NutriApp - Diario Nutricional y Calculadora de Macros

**NutriApp** es una Aplicación Web Progresiva (PWA) diseñada para el registro, control y análisis de la ingesta diaria de alimentos. Su arquitectura se centra en la privacidad del usuario, ejecutándose íntegramente en el navegador y almacenando los datos de manera local sin dependencia de servidores externos.

## Características Principales

* **Registro Diario (Alimentos y Recetas):** Interfaz unificada para registrar alimentos individuales (gramos/unidades) o recetas completas (unidades).
* **Gestión de Recetas:**
  * **Creación:** Permite crear recetas personalizadas agrupando alimentos desde el historial.
  * **Uso:** Las recetas guardadas calculan automáticamente la suma de macros y calorías.
  * **Desglose:** Al analizar una receta en el historial, se pueden visualizar sus ingredientes originales.
* **Base de Datos Híbrida:**
  * Listado predefinido de alimentos comunes.
  * **Búsqueda Online:** Integración con la API de *OpenFoodFacts* para localizar productos comerciales.
  * **Escáner de Códigos de Barras:** Utilidad integrada para escanear productos físicos mediante la cámara.
* **Comunidad (Simulación):** Contador de "Proyección de Registros" que estima la actividad global de la app para motivar al usuario.
* **Compartir:** Botón integrado para compartir la aplicación rápidamente vía WhatsApp.
* **Visualización de Datos:** Gráficos de distribución calórica (proteínas, carbohidratos, grasas) y resumen numérico en tiempo real.
* **Historial y Filtrado:** Consulta de registros pasados con filtros por rango de fechas.
* **Análisis Personalizado:** Herramienta de selección múltiple para analizar la suma nutricional de registros específicos.
* **Gestión de Datos (Backup Completo):** Sistema de exportación e importación que incluye historial, alimentos personalizados y recetas.

## Guía de Uso

### 1. Panel de Registro (Inicio)

Bajo el lema *"Nutre tu mejor versión"*, encontrarás las herramientas principales:

* **Búsqueda y Escáner:**
  * Barra superior para buscar productos online o activar la cámara.
  * Los resultados se añaden temporalmente al desplegable de alimentos.
* **Añadir Alimento:**
  * Selecciona del desplegable de alimentos.
  * Indica la cantidad (normalmente en gramos).
  * Pulsa la tarjeta **"Añadir Alimento"**.
* **Añadir Receta:**
  * Selecciona del desplegable de recetas (marcadas con el icono 📖).
  * Indica la cantidad en unidades (ej. 1.5 raciones).
  * Pulsa la tarjeta **"Añadir Receta"**.
* **Contador de Comunidad:** Indicador visual que crece con el tiempo y con tus registros, mostrando la actividad proyectada de la app.

### 2. Historial y Análisis

* **Gestión de Registros:** Elimina entradas individuales o filtra por fechas.
* **Modo Análisis y Creación de Recetas:**
  1. Selecciona múltiples registros usando las casillas (checkbox).
  2. Pulsa el botón flotante **"Analizar"**.
  3. Verás el desglose nutricional total.
  4. Pulsa el botón **"+"** en el modal para **Guardar como Receta** (te pedirá nombre y descripción).

### 3. Gestión de Datos

Ubicado en la pestaña "Datos", permite la persistencia total:

* **Exportar todo:** Genera un archivo `.json` que contiene: Historial + Alimentos Personalizados + Recetas Creadas, este archivo se descarga en su dispositivo, conservelo para su uso en caso de borrado accidental.
* **Importar copia:** Restaura todos los datos desde un archivo previo.
* **Borrar todo:** Factory Reset (elimina historial, alimentos y recetas del navegador).

## Instalación y Requisitos Técnicos

Esta aplicación es una **PWA (Progressive Web App)** estática.

* **Requisitos:** Cualquier navegador web moderno con soporte para JavaScript y LocalStorage (Chrome, Safari, Firefox, Edge).
* **Instalación:** Puede añadir la aplicación a la pantalla de inicio de su dispositivo móvil para utilizarla como una aplicación nativa y acceder a ella sin conexión.
* **Tecnologías:** HTML5, Tailwind CSS, Chart.js, Html5Qrcode.
* **Enlace a la App:** [https://diegomguillen.github.io/registro_nutricional](https://diegomguillen.github.io/registro_nutricional)

## Disclaimer (Descargo de Responsabilidad)

**1. Propósito Informativo**
Esta aplicación ha sido desarrollada con fines exclusivamente educativos y de autogestión. La información proporcionada no constituye consejo profesional alguno, si tiene dudas, o no le interesa, no la use.

**2. Exactitud de los Datos**
* Los valores nutricionales predeterminados son aproximaciones.
* Los datos de búsqueda online provienen de *OpenFoodFacts*. Se recomienda verificar con el etiquetado físico.
* El contador de "Proyección de Registros" es un valor algorítmico estimado, no un dato en tiempo real de servidor, es así para garantizar la privacidad al máximo nivel.

**3. Privacidad**
NutriApp funciona del lado del cliente (*client-side*). Todos los datos (incluyendo recetas e historial) se almacenan exclusivamente en su dispositivo, solo los usa la app, nadie externo puede acceder a ellos, esta aplicación
no almacena datos en servidores externos, es. No se envían datos servidores externos, más allá de los puramente necesarios para que el servidor que aloja la web sepa que tiene que servírsela a su navegador.
Para borrar **todos** los rastros de Nutriapp simplemente pulse borrar todo desde la pestaña de "Gestión de datos" y elimine de la carpeta de descargas el archivo de copia de seguridad.
