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

* **Registro Diario de Alimentos:** Interfaz intuitiva para añadir comidas, especificando cantidades en gramos o unidades.
* **Base de Datos Híbrida:**
* Listado predefinido de alimentos comunes.
* **Búsqueda Online:** Integración con la API de *OpenFoodFacts* para localizar productos comerciales.
* **Escáner de Códigos de Barras:** Utilidad integrada para escanear productos físicos mediante la cámara del dispositivo.


* **Gestión Dinámica de Alimentos:** Los alimentos buscados o escaneados se añaden temporalmente al catálogo y solo se guardan permanentemente si se utilizan en un registro. Posibilidad de eliminar alimentos del listado desplegable.
* **Visualización de Datos:** Gráficos de distribución calórica (proteínas, carbohidratos, grasas) y resumen numérico en tiempo real.
* **Historial y Filtrado:** Consulta de registros pasados con filtros por rango de fechas.
* **Análisis Personalizado:** Herramienta de selección múltiple para analizar la suma nutricional de registros específicos.
* **Gestión de Datos (Backup):** Sistema de exportación e importación de copias de seguridad en formato JSON.

## Guía de Uso

### 1. Panel de Registro (Inicio)

Es la pantalla principal de la aplicación.

* **Selección de Fecha:** Por defecto muestra la fecha actual, pero permite registrar comidas en fechas pasadas o futuras.
* **Búsqueda y Escáner:**
* Utilice el campo de texto para buscar productos online.
* Pulse el icono de código de barras para activar la cámara y escanear un producto.
* *Nota:* Los resultados de búsqueda se añaden al desplegable. Si no se utilizan para crear un registro, desaparecerán al recargar la página para no saturar la lista.


* **Añadir Alimento:** Seleccione un alimento del desplegable, introduzca la cantidad y pulse "Añadir Registro".
* **Borrar del listado:** Junto al desplegable encontrará un botón (icono de papelera) para eliminar permanentemente un alimento de su lista de selección.


* **Resumen Diario:** Al final de la vista se muestra un gráfico de anillo con la distribución de macros y el total calórico del día seleccionado.

### 2. Historial

Permite visualizar los registros almacenados.

* **Filtros:** Puede filtrar por "Hoy", desplazarse día a día (+1/-1 Día) o seleccionar un rango de fechas específico.
* **Gestión de Registros:**
* Para eliminar un registro individual, pulse el icono de papelera situado a la derecha de cada fila.
* **Modo Análisis:** Seleccione múltiples casillas (checkbox) a la izquierda de los alimentos. Aparecerá un botón flotante "Analizar" que abrirá una ventana con la suma nutricional exclusiva de los elementos seleccionados.



### 3. Gestión de Datos

Ubicado en la pestaña "Datos", este módulo permite la persistencia y portabilidad de la información:

* **Exportar todo:** Genera un archivo `.json` que contiene tanto el historial de registros como la lista de alimentos personalizados.
* **Importar copia:** Permite restaurar una copia de seguridad previamente exportada.
* **Borrar todo:** Elimina todos los datos del almacenamiento local del navegador (Factory Reset).

## Instalación y Requisitos Técnicos

Esta aplicación es una **PWA (Progressive Web App)** estática.

* **Requisitos:** Cualquier navegador web moderno con soporte para JavaScript y LocalStorage (Chrome, Safari, Firefox, Edge).
* **Instalación:** Puede añadir la aplicación a la pantalla de inicio de su dispositivo móvil para utilizarla como una aplicación nativa y acceder a ella sin conexión.
* **Tecnologías:** HTML5, Tailwind CSS, Chart.js, Html5Qrcode.

## Disclaimer (Descargo de Responsabilidad)

**1. Propósito Informativo**
Esta aplicación ha sido desarrollada con fines exclusivamente educativos y de autogestión. La información proporcionada por NutriApp no constituye consejo médico, diagnóstico ni tratamiento.

**2. Exactitud de los Datos**

* Los valores nutricionales predeterminados son aproximaciones generales.
* Los datos obtenidos a través de la búsqueda online y el escáner de códigos de barras provienen de *OpenFoodFacts*, una base de datos colaborativa abierta. No se garantiza la exactitud, integridad o actualidad de dicha información. Se recomienda al usuario verificar los valores con el etiquetado físico del producto.

**3. Privacidad y Datos**
NutriApp funciona del lado del cliente (*client-side*). Todos los datos ingresados se almacenan exclusivamente en el dispositivo del usuario (`LocalStorage`). No se envían datos personales ni de registro a servidores externos, salvo las consultas anónimas realizadas a la API de OpenFoodFacts para la búsqueda de productos. El usuario es responsable de realizar copias de seguridad periódicas de sus datos.

**4. Limitación de Responsabilidad**
El desarrollador no se hace responsable de daños directos, indirectos, incidentales o consecuentes que resulten del uso o la imposibilidad de uso de esta aplicación, ni de errores en el cálculo nutricional que puedan afectar a la dieta del usuario. El uso de esta aplicación es bajo su propio riesgo.
