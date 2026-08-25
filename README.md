<div align="center">
  <img src="icon3.png" alt="Logo NutriApp" width="120" />
  <h1>NutriApp</h1>
  <p>
    <strong>Diario Nutricional, Módulo Garmin & Nutrición FFM y Analítica Corporal</strong>
  </p>
  <p>
    Aplicación Web Progresiva (PWA) para el registro, control nutricional avanzado, integración OCR con Garmin Connect y análisis de composición corporal, centrada en la privacidad y el funcionamiento 100% offline.
  </p>
</div>

---
# NutriApp - Diario Nutricional y Calculadora de Macros Avanzada

**NutriApp** es una Aplicación Web Progresiva (PWA) diseñada para el registro, control y análisis científico de la ingesta diaria de alimentos y composición corporal. Su arquitectura está centrada en la privacidad absoluta del usuario, ejecutándose íntegramente en el navegador y almacenando los datos localmente en `LocalStorage` sin dependencia de servidores externos.

## Características Principales

* **Registro Diario (Alimentos y Recetas):** Interfaz unificada para registrar alimentos individuales (gramos/unidades) o recetas completas (unidades).
* **Módulo Garmin & Nutrición FFM (Masa Magra):**
  * **Deslizadores Interactivos:** Control directo del Gasto Calórico de referencia, Peso, % Grasa, Masa Magra Esquelética, Masa Magra FFM (solo lectura), % Agua, ratios de Proteína/Grasa por kg de FFM y Ajuste calórico diario.
  * **Escáner OCR para Garmin Connect:** Lectura e importación automática de capturas de pantalla de la app Garmin Connect (mediante Tesseract.js) con soporte de pegado directo (`Ctrl+V`).
  * **Set Fat-Free Mass Based Nutrition (Preset Científico):** Interruptor inteligente basado en literatura científica (*Helms et al., Morton et al.*) que fija 2.4g Proteína y 1.0g Grasa por kg de FFM activa.
  * **Set Déficit Máximo:** Interruptor que aplica el máximo déficit calórico seguro recomendado manteniendo la glucemia y glucógeno adecuados.
  * **Panel Resumen de Macros:** 4 cuadrados de datos independientes (`PROT`, `CARB`, `GRAS`, `KCAL`) con desglose de gramos, calorías y porcentajes de distribución en tiempo real.
* **Correlaciones & Composición Corporal (4 Gráficos Avanzados):**
  * **Carbohidratos vs Agua & Magra (kg):** Relación entre ingesta de hidratos, recarga de glucógeno y volumen de agua corporal.
  * **Peso vs Masa Magra & Grasa (kg):** Evolución del peso corporal desglosado en kg de masa magra y kg de grasa.
  * **Composición Corporal (% Grasa vs % Agua):** Tendencia de porcentajes corporales a lo largo del tiempo.
  * **Déficit Real vs Masa Magra:** Comparativa entre el balance calórico diario real y la conservación de la masa muscular.
  * **Filtros Temporales:** Visualización ajustable por `1 Mes`, `3 Meses`, `6 Meses`, `1 Año` o `Todo`.
  * **Eje X Limpio:** Muestra la fecha más antigua a la izquierda y la más reciente a la derecha para un análisis despejado.
  * **Modales de Ayuda e Interpretación (❓):** Guías explicativas y evidencia científica integrada para cada métrica y gráfico.
* **Gestión de Recetas:**
  * **Creación:** Permite crear recetas personalizadas agrupando alimentos desde el historial.
  * **Uso y Desglose:** Las recetas guardadas calculan automáticamente la suma de macros y permiten ver sus ingredientes originales.
* **Base de Datos Híbrida:**
  * Listado predefinido de alimentos comunes + Alimentos personalizados.
  * **Búsqueda Online:** Integración con la API de *OpenFoodFacts*.
  * **Escáner de Códigos de Barras:** Utilidad integrada con la cámara del dispositivo.
* **Privacidad y Backup Completo:** Exportación e importación en formato `.json` de todo el historial, recetas y mediciones corporales.

---

## Guía de Uso

### 1. Panel de Registro (Inicio)

Esta vista actúa como el cuadro de mando principal de la aplicación, diseñado para ofrecer una visión rápida del estado nutricional actual y facilitar la introducción de nuevos datos.

* **Resumen Nutricional (Dashboard):**
  * **Gráfico de Distribución:** Un gráfico de anillo central muestra la proporción de macronutrientes consumidos en el día (Proteínas, Carbohidratos, Grasas).
  * **Indicadores Numéricos:** Gramos totales consumidos por macronutriente y total calórico acumulado (Kcal).
  * **Compartir App:** Botón en cabecera para compartir la app vía WhatsApp.

* **Métricas Garmin & Nutrición FFM:**
  * **Lectura OCR:** Haz clic en **OCR** o usa **Ctrl+V** para subir una captura de pantalla de Garmin Connect; la app extraerá e ingresará automáticamente el Peso, % Grasa, Masa Magra y % Agua.
  * **Controles FFM & Déficit:** Usa los interruptores estilo iOS para activar los modelos de nutrición FFM (2.4g Prot / 1.0g Grasa por kg FFM) o establecer el Máximo Déficit Seguro.
  * **Guardar Medición Corporal:** Guarda las lecturas del día directamente en el historial de composición corporal.

* **Tarjetas de Tendencia (Comparativas):**
  * Tarjetas de resumen que muestran el progreso nutricional de **"Ayer"** y de la **"Semana Pasada"**.

* **Botón de Acción (+):**
  * Despliega un menú modal para elegir qué tipo de entrada se desea registrar: **Alimento** o **Receta**.

---

### 2. Correlaciones & Composición Corporal

Sección analítica para evaluar la evolución fisiológica y el rendimiento deportivo a través de 4 gráficos interactivos con Chart.js:

1. **Filtros Temporales:** Selector superior (`1m`, `3m`, `6m`, `1y`, `all`) para acotar los periodos visualizados.
2. **Ayudas ❓:** Cada gráfica dispone de su botón de ayuda con interpretación de tendencias y conclusiones prácticas.
3. **Eje X Optimizado:** Visualización limpia mostrando la fecha inicial a la izquierda y la fecha final a la derecha.

---

### 3. Historial y Análisis

Sección dedicada a la revisión detallada de los registros, la edición de datos y la creación de nuevas recetas a partir de comidas existentes.

* **Filtro por Fechas y Navegación Rápida:** Muévete con botones **"-1 Día"**, **"Hoy"** y **"+1 Día"**.
* **Tabla de Registros:** Listado interactivo con casilla de selección múltiple.
* **Modo Análisis y Creación de Recetas:**
  1. Marque casillas de alimentos consumidos.
  2. Pulse **"Analizar"** para ver la suma nutricional y la distribución.
  3. Pulse **"+"** para convertir la selección en una **Receta** reutilizable.

---

### 4. Gestión de Datos

Ubicado en la pestaña "Datos", permite la persistencia total:

* **Exportar todo:** Genera un archivo `.json` con el Historial, Alimentos Personalizados, Recetas y Mediciones Corporales.
* **Importar copia:** Restaura todos los datos desde un archivo previo.
* **Borrar todo:** Restablecimiento de fábrica (elimina todo del almacenamiento local).

---

### 5. Instalación y Requisitos Técnicos

Esta aplicación es una **PWA (Progressive Web App)** estática.

* **Requisitos:** Navegador web moderno (Chrome, Safari, Firefox, Edge).
* **Instalación:** Puede añadir la aplicación a la pantalla de inicio para usarla offline como app nativa.
* **Tecnologías:** HTML5, Vanilla CSS, Tailwind CSS, Chart.js, Tesseract.js (OCR), Html5Qrcode.
* **Enlace a la App:** [https://diegomguillen.github.io/registro_nutricional](https://diegomguillen.github.io/registro_nutricional)

---

### 6. Licencia y Atribución de Datos (Open Food Facts)

Esta aplicación utiliza datos procedentes de **Open Food Facts**.

* **Fuente de Datos:** [Open Food Facts](https://es.openfoodfacts.org)
* **Licencia de la Base de Datos:** [Open Database License (ODbL)](https://opendatacommons.org/licenses/odbl/1-0/)
* **Licencia de Contenidos:** [Database Contents License (DbCL)](https://opendatacommons.org/licenses/dbcl/1-0/)

---

### 7. Descargo de Responsabilidad (Disclaimer)

**1. Propósito Informativo y Deportivo:**
Esta aplicación se desarrolla con fines exclusivamente informativos, educativos y de autogestión deportiva personal. No constituye ni sustituye el consejo médico, nutricional o diagnóstico profesional. Si tiene dudas sobre su uso, no está de acuerdo con los criterios aplicados o no le interesa, simplemente no la utilice.

**2. Exactitud de los Datos & OCR:**
* Los valores nutricionales y el reconocimiento OCR de capturas son aproximaciones. Se recomienda verificar los datos leídos.
* Los datos online provienen de *OpenFoodFacts*.

**3. Privacidad Absoluta:**
NutriApp funciona 100% del lado del cliente (*client-side*). Todos los datos se almacenan de forma privada en el almacenamiento local de su dispositivo (`LocalStorage`). No se envían ni almacenan datos en servidores externos.
