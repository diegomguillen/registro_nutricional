# Plan de Implementación - Fase 2: Indicadores Nutricionales y Rendimiento Deportivo

Este documento contiene el plan técnico, fisiológico y de interfaz para la **Fase 2** del proyecto: calcular y presentar indicadores avanzados a partir de la clasificación de ingestas y timing peri-entrenamiento implementada en la Fase 1.

---

## 1. Fundamentación Fisiológica: Agudo vs. Crónico

Para garantizar rigor científico y evitar interpretaciones erróneas, los indicadores se dividen en dos escalas temporales:

* **Nivel Inmediato / Diario (Efectos Agudos):**
  * Evalúa el **rendimiento en la sesión**, el **confort gastrointestinal**, la **cobertura de síntesis proteica del día (MPS)** y la **reposición aguda de glucógeno**.
  * Explica las **oscilaciones de peso hídrico al día siguiente** (recarga de glucógeno + sodio: ~3–4 g de agua por gramo de glucógeno), aclarando que **no es ganancia ni pérdida de masa muscular de un día para otro**.
* **Nivel Medio / Largo Plazo (Efectos Crónicos acumulados a 14–30 días):**
  * La hipertrofia o la preservación muscular en déficit calórico requiere semanas.
  * Se evalúa el **Índice de Consistencia Peri-Workout** frente a la evolución de la **Masa Muscular Seca EMA (α = 0.3)** y la **Masa Grasa EMA**.

---

## 2. Catálogo de los 8 Indicadores Propuestos

### Grupo A: Indicadores Diarios Peri-Entrenamiento (Rendimiento y Digestión)

#### 1. Pre-Workout Fuel & Lightness (Carga Energética y Digestibilidad Previa)
* **Objetivo:** Asegurar disponibilidad de carbohidratos para el esfuerzo minimizando el riesgo de pesadez o molestias digestivas.
* **Cálculo:**
  * $\text{Carbs}_{\text{pre}}$ (g y g/kg de masa magra FFM).
  * $\text{Grasa}_{\text{pre}}$ (g) y $\text{Fibra}_{\text{pre}}$ (g).
* **Semáforo:**
  * 🟢 **Óptimo:** Carbohidratos $\ge 0.5\text{–}1.0\text{ g/kg FFM}$ con Grasa $< 15\text{–}20\text{ g}$.
  * 🟡 **Bajo en energía:** Carbohidratos $< 0.3\text{ g/kg FFM}$ antes de una sesión exigente.
  * 🔴 **Alerta digestiva:** Grasa $> 25\text{ g}$ en la comida previa (vaciado gástrico lento).

#### 2. Intra-Workout Support (Soporte en Esfuerzo Prolongado)
* **Objetivo:** Monitorear el aporte de azúcares rápidos y electrolitos en sesiones prolongadas (>60–90 min, MTB o WODs dobles).
* **Cálculo:** Carbohidratos totales registrados con `timing: 'intra'`.
* **Semáforo:**
  * 🟢 **Activo:** Aporte de 30–60 g/h en sesiones de alta duración.
  * ⚪ **Neutro:** No requerido en entrenamientos cortos o de baja intensidad.

#### 3. Post-Workout Recovery (Disparo Anabólico y Recarga de Glucógeno)
* **Objetivo:** Activar el umbral de leucina e iniciar la resíntesis de glucógeno muscular.
* **Cálculo:**
  * Proteína en post-entreno vs. umbral anabólico ($\ge 0.35\text{ g/kg FFM}$ o $25\text{–}40\text{ g}$ de proteína neta con $\ge 2.5\text{–}3.0\text{ g}$ de leucina).
  * Ratio Carbohidrato:Proteína ($\text{Carbs}_{\text{post}} / \text{Prot}_{\text{post}}$).
* **Semáforo:**
  * 🟢 **Óptimo:** Proteína $\ge 0.35\text{ g/kg FFM}$ y ratio Carb:Prot entre 2:1 y 4:1.
  * 🟡 **Recuperación parcial:** Proteína suficiente pero sin carbohidratos de reposición.
  * 🔴 **Alerta:** Ayuno prolongado post-esfuerzo o aporte proteico insuficiente.

#### 4. Peri-Workout Energy Share (% Calórico Alrededor del Esfuerzo)
* **Objetivo:** Medir la partición de nutrientes (*Nutrient Partitioning*): porcentaje de la energía del día que se consume cuando el músculo más la aprovecha.
* **Fórmula:**
  $$\text{Energy Share} = \frac{\text{Kcal}_{\text{pre}} + \text{Kcal}_{\text{intra}} + \text{Kcal}_{\text{post}}}{\text{Kcal Totales del Día}} \times 100$$
* **Semáforo:**
  * 🟢 **40% – 60%:** Distribución eficiente para entrenamientos intensos.
  * 🟡 **< 30%:** La mayor parte de la energía se ingiere en reposo o lejos del estímulo motor.

---

### Grupo B: Indicadores Diarios de Distribución (Crononutrición)

#### 5. Pulsos Proteicos Efectivos (Picos de MPS)
* **Objetivo:** Verificar que la proteína diaria (ej. 2.4 g/kg FFM) esté repartida de forma que estimule la síntesis proteica varias veces al día.
* **Cálculo:** Número de ingestas principales que alcanzan el umbral de leucina ($\ge 0.35\text{ g/kg FFM}$ o $\ge 25\text{ g}$ de proteína).
* **Semáforo:**
  * 🟢 **3 a 5 pulsos/día:** Reparto anabólico óptimo.
  * 🔴 **< 2 pulsos:** Proteína hiperconcentrada en una única comida (ej. 80% en la cena).

#### 6. Carb Timing Balance (Distribución Diurna vs. Nocturna)
* **Objetivo:** Evaluar si los carbohidratos están colocados estratégicamente según el horario del entrenamiento (apoyo a la sesión matutina o vespertina y favorecimiento del descanso nocturno).

---

### Grupo C: Indicadores Acumulados y Diagnósticos (Medio / Largo Plazo)

#### 7. Índice de Consistencia Peri-Workout (Adherencia Acumulada a 14–30 Días)
* **Objetivo:** Métrica clave para correlacionar con la curva de **Masa Muscular Seca EMA**:
  $$\text{Consistencia} = \frac{\text{Días de entreno con Pre y Post óptimos}}{\text{Días totales de entrenamiento}} \times 100$$
* **Aplicación práctica:** Responder con datos reales: *¿Los meses con >85% de consistencia peri-entreno lograron mantener la masa muscular intacta (pendiente 0 o positiva) durante periodos de déficit calórico?*

#### 8. Diagnóstico de Ruido Hídrico Post-Carga
* **Objetivo:** Eliminar falsas alarmas de "he engordado" tras pesajes en báscula.
* **Lógica:** Si al día siguiente ($N+1$) Garmin detecta un aumento brusco de peso/agua corporal, y la cena o post-entreno del día $N$ superó los $3\text{ g/kg FFM}$ de carbohidratos con sodio, la app muestra un aviso aclaratorio:
  > *💡 "Aumento de peso por hidratación de glucógeno intracelular (+X litros de agua). Masa muscular contráctil intacta."*

---

## 3. Componentes de Interfaz Propuestos para la Fase 2

1. **Card "Timing & Rendimiento Deportivo" en el Dashboard:**
   * Resumen de los 4 badges diarios: Pre-Fuel, Post-Recovery, Energy Share y Pulsos Proteicos.
2. **Barra de Partición de Energía Peri-Workout:**
   * Barra apilada interactiva que muestra visualmente qué porción de las calorías del día corresponden a [Pre] [Intra] [Post] [Resto del día].
3. **Widget de Pulsos Proteicos:**
   * Indicador visual de los 3-5 picos diarios de proteína alcanzados (con conteo de gramos por pulso).
4. **Integración en Gráficas Históricas:**
   * Inclusión del Índice de Consistencia en el gráfico `PROTEIN VS MUSCLE` y en el semáforo fisiológico de recomposición corporal.

---

## 4. Hoja de Ruta para la Implementación de la Fase 2

* **Paso 1:** Implementar el módulo de cálculo de métricas agregadas por comida y timing en JavaScript.
* **Paso 2:** Crear la tarjeta visual de KPIs en el panel principal (`#view-home`).
* **Paso 3:** Incorporar el explicador de ruido hídrico matutino cruzando la ingesta de Carbs de $N-1$ con el pesaje de Garmin de $N$.
* **Paso 4:** Añadir la correlación de consistencia peri-entreno mensual en los gráficos de composición corporal.
