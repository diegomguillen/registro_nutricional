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
* **Gestión de Días Libres / Incompletos:** Interruptor para marcar días con ingesta incompleta o cenas fuera (`Registro Incompleto`), aislándolos de las correlaciones de Pearson e imputando balance neutro para no falsear los semáforos ni crear déficits ficticios.
* **Módulo Garmin & Nutrición FFM (Masa Magra):**
  * **Deslizadores Interactivos & Calibrador TDEE:** Control directo del Gasto Calórico de referencia, Peso, % Grasa, Masa Magra Esquelética, Masa Magra FFM (solo lectura), % Agua, ratios de Proteína/Grasa por kg de FFM y Ajuste calórico diario.
  * **Calibrador de Gasto Real Garmin (Herramienta Consultiva):** Deducción metabólica termodinámica (TDEE Real) basada en la pérdida/ganancia de Masa Grasa EMA (1 kg grasa = 7,700 kcal). Excluye automáticamente días incompletos y permite aplicar la corrección sugerida al deslizador con un solo clic.
  * **Escáner OCR para Garmin Connect:** Lectura e importación automática de capturas de pantalla de la app Garmin Connect (mediante Tesseract.js) con soporte de pegado directo (`Ctrl+V`).
  * **Set Fat-Free Mass Based Nutrition (Preset Científico):** Interruptor inteligente basado en literatura científica (*Helms et al., Morton et al.*) que fija 2.4g Proteína y 1.0g Grasa por kg de FFM activa.
  * **Set Déficit Máximo:** Interruptor que aplica el máximo déficit calórico seguro recomendado manteniendo la glucemia y glucógeno adecuados.
  * **Panel Resumen de Macros:** 4 cuadrados de datos independientes (`PROT`, `CARB`, `GRAS`, `KCAL`) con desglose de gramos, calorías y porcentajes de distribución en tiempo real.
* **Modelo Biofísico de Corrección SMM (Báscula Bioimpedancia):**
  * **Aislamiento del 27% Seco:** Aisla la matriz proteica contráctil pura libre de agua (`SMM_seca = SMM × 0.27`).
  * **Normalización Hídrica por Mediana:** Normaliza las lecturas frente a la mediana hídrica histórica del propio usuario (`%TBW_ref`) neutralizando las fluctuaciones por sudoración o glucógeno.
  * **Filtro de Tendencia EMA (α = 0.3):** Aplica una Media Móvil Exponencial (EMA) sobre la masa seca normalizada y sobre la masa grasa corporal para aplanar artefactos hídricos/bioeléctricos diarios y observar tendencias reales a medio plazo.
  * **Zona Muerta de Tolerancia (Deadband ±50g):** Toda variación de masa muscular seca inferior a 50 gramos (|Δ| < 0.05 kg) se evalúa como `0.00 kg (Intacto)` para evitar falsas alarmas por ruido hídrico/instrumental.
* **Correlaciones & Composición Corporal (5 Gráficos Avanzados con Semáforos Inteligentes):**
  * **WEIGHT VS FAT (EMA) VS WATER VS MUSCLE:** Foto panorámica de recomposición corporal (Peso Total vs Masa Grasa EMA kg vs Masa de Agua kg vs Masa Muscular Seca EMA).
  * **PROTEIN VS MUSCLE:** Ingesta de proteína (g) vs Masa Muscular Seca EMA (kg).
  * **CARBS VS WATER & MUSCLE:** Carbohidratos (g) vs Masa de Agua (kg) & Masa Seca.
  * **DEFICIT REAL VS MUSCLE:** Balance calórico diario (kcal) vs Masa Muscular Seca EMA (kg).
  * **IMPACTO ACTIVIDAD:** Respuesta de WOD, MTB y Descanso evaluadas contra la tendencia seca EMA.
  * **Semáforos Fisiológicos Coherentes:** Badges informativos con r de Pearson calibrados por especialidad (`Recomposición Limpia`, `Protección Proteica`, `Carbo-Hidratación Limpia`, `Conservación Magra`).
  * **Modales de Ayuda e Interpretación (❓):** Incluyen en cada gráfica la fórmula del algoritmo, ejemplo numérico de utilidad y guía de interpretación de curvas.

---

## Modelo Biofísico de Corrección SMM & Tendencia Muscular y Grasa Real (EMA)

Para eliminar las distorsiones ocasionadas por el estado de hidratación y la depleción de glucógeno en básculas de bioimpedancia (ej. Garmin Index S2), **NutriApp** aplica un modelo biofísico de corrección hídrica en 3 pasos:

### 1. Aislamiento de la Masa Muscular Seca (27%)
El tejido muscular magro vivo contiene un ~73% de agua. Se aisla la matriz proteica contráctil pura libre de agua:
$$\text{SMM}_{\text{seca}} = \text{SMM} \times 0.27$$

### 2. Normalización Hídrica por Mediana (%TBW_ref)
Para evitar que la sudoración o depleción tras entrenamientos altere engañosamente la lectura de la báscula, la masa muscular se normaliza respecto a la **mediana hídrica histórica del propio usuario** ($\\% \text{TBW}_{\text{ref}}$):
$$\text{SMM}_{\text{norm}} = \text{SMM} \times \left( \frac{\\% \text{TBW}_{\text{ref}}}{\\% \text{TBW}} \right)$$
$$\text{SMM}_{\text{seca,norm}} = \text{SMM}_{\text{norm}} \times 0.27$$

### 3. Filtro de Fluctuación Bioeléctrica Muscular y Grasa (Suavizado EMA α = 0.3)
Se aplica una Media Móvil Exponencial (EMA) tanto sobre la masa seca normalizada como sobre la masa grasa estimada para aislar la tendencia fisiológica real frente al ruido bioeléctrico diario:
$$\text{EMA}_{\text{SMM}, t} = 0.3 \times \text{SMM}_{\text{seca,norm}, t} + 0.7 \times \text{EMA}_{\text{SMM}, t-1}$$
$$\text{Fat}_{\text{EMA}, t} = 0.3 \times \text{Fat}_{t} + 0.7 \times \text{Fat}_{\text{EMA}, t-1}$$

### 4. Desfase Metabólico de Ingesta 24h (N-1 → N)
El pesaje matutino en ayunas (6:00 AM) del día $N$ refleja la masa corporal, glucógeno y agua generados por la ingesta y el entrenamiento del día anterior ($N-1$). Para mantener la causalidad fisiológica real y evitar distorsiones por registros en curso a primera hora, **NutriApp** vincula la composición corporal del día $N$ con la ingesta nutricional del día $N-1$.

---

### 💡 Ejemplo Práctico de Utilidad Real

| Fecha | Evento | Peso | % Agua | SMM Garmin (Bruto) | SMM Seca EMA (NutriApp) | Diagnóstico |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **Día 1** | Descanso | 85.0 kg | 55.7% | 33.9 kg | **9.15 kg** | Estado basal hídrico normal. |
| **Día 2** | WOD 1 | 83.7 kg | 55.6% | 33.6 kg | **9.13 kg** | Perdió -1.3 kg de peso/agua. La EMA mantiene la masa seca. |
| **Día 3** | WOD 2 | 83.2 kg | 55.7% | 33.4 kg | **9.10 kg** | **Garmin marca -0.5 kg de músculo por deshidratación**. NutriApp demuestra que tu tejido contráctil está **100% intacto a 9.1 kg**. |

> **Resultado:** La báscula Garmin da una falsa alarma de pérdida de -0.5 kg de músculo en 48h por menor volumen hídrico. El modelo biofísico de NutriApp demuestra que el peso perdido (-1.8 kg) fue exclusivamente vaciado de agua y glucógeno, manteniendo la masa muscular contráctil intocada.

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
