# Plan de Implementación - Fase 1: Clasificación de Ingestas y Timing Deportivo

Este documento contiene el plan técnico y de experiencia de usuario para la **Fase 1** del proyecto de registro nutricional: permitir clasificar una o varias ingestas en momentos del día y en timing deportivo peri-entrenamiento, manteniendo total retrocompatibilidad con el historial existente.

---

## 1. Alcance y Objetivos de la Fase 1

* **Doble clasificación de ingestas:**
  * **Momento del día (`meal`):** Desayuno, Comida, Merienda, Cena, Snack (y `general` como fallback para historial previo).
  * **Timing deportivo (`timing`):** Neutro (`neutro`), Pre-entrenamiento (`pre`), Intra-entrenamiento (`intra`), Post-entrenamiento (`post`).
* **Catálogo `foods.json`:** Permanece **100% intacto**. La clasificación es una propiedad del evento de consumo (registro diario), no del alimento.
* **Experiencia de usuario fluida:** Registro rápido sin clics innecesarios, selección directa por bloque y capacidad de clasificar en lote (varias ingestas a la vez).
* **Retrocompatibilidad absoluta:** Los registros históricos previos sin clasificar se muestran agrupados bajo una sección limpia ("📦 Registro General") sin alterar cálculos, calorías, macros ni correlaciones con Garmin y la Masa Muscular Seca EMA.

---

## 2. Modelo de Datos y Persistencia

### Estructura en `globalLog`
Cada objeto de registro en el diario pasa a incluir:

```javascript
{
  id: 1788279602391,            // Timestamp de registro
  date: "2026-09-01",           // Fecha asignada
  type: "food",                 // 'food' | 'recipe'
  foodId: 8,                    // ID en foods.json
  foodName: "Leche Semidesnatada",
  foodIcon: "🥛",
  amount: 216,
  unit: "g",
  p: 6.7, c: 10.2, f: 3.5, kcal: 99.1,
  sortOrder: 0,
  // --- NUEVOS CAMPOS FASE 1 ---
  meal: "desayuno",             // 'desayuno' | 'comida' | 'merienda' | 'cena' | 'snack' | 'general'
  timing: "pre"                 // 'neutro' | 'pre' | 'intra' | 'post'
}
```

### Reglas de Lectura y Fallback:
* Si `item.meal` es `undefined` o vacío ➔ se evalúa como `'general'`.
* Si `item.timing` es `undefined` o vacío ➔ se evalúa como `'neutro'`.
* La versión de respaldo (`backupObject.version`) se actualiza a `6`. Los backups anteriores v5 se leen aplicando estos fallbacks transparentemente.

---

## 3. Experiencia de Usuario (UX) e Interfaz

### A. Registro Contextual desde el Diario
En el diario diario, los alimentos se visualizan divididos por secciones de comida:
* Cada tarjeta de comida (🌅 Desayuno, 🥗 Comida, 🥪 Merienda, 🌙 Cena, 🍎 Snacks) dispone de su propio botón **`+ Añadir`**.
* Al pulsar `+ Añadir` en un bloque específico, el modal se abre con esa comida ya preseleccionada.

### B. Selectores Rápidos en Modales
En los modales de interacción se incorporan selectores de tipo chip (1 toque):
1. **Modal de Alimento individual (`#foodModal`):**
   * Selector de Momento: `[ Desayuno ]` `[ Comida ]` `[ Merienda ]` `[ Cena ]` `[ Snack ]`.
   * Selector de Timing: `[ ⚪ Neutro ]` `[ ⚡ Pre ]` `[ 🔥 Intra ]` `[ 💪 Post ]`.
2. **Modal de Receta (`#recipeLogModal`):**
   * Mismos selectores rápidos para incorporar recetas completas al bloque y timing deseados.
3. **Modal de Edición Rápida (`#editAmountModal`):**
   * Además de ajustar la cantidad (gramos/unidades), permite reasignar el Momento y el Timing de un alimento ya registrado sin necesidad de borrarlo.

### C. Clasificación y Acciones en Lote (Varias Ingestas a la Vez)
* **A nivel de bloque de comida:** La cabecera de cada comida cuenta con un control rápido para marcar **todos los alimentos del bloque** como `Pre`, `Intra`, `Post` o `Neutro` con un solo clic.
* **A nivel de selección múltiple (Checkboxes):** Cuando se seleccionan varios alimentos con los checkboxes, la barra de acciones flotante (FAB) incluye:
  * *Mover selección a:* Selector para reubicar todos los alimentos marcados a otra comida en bloque.
  * *Asignar timing a selección:* Asigna `Pre`, `Intra`, `Post` o `Neutro` a todos los seleccionados simultáneamente.

---

## 4. Visualización en el Diario (`renderTable`)

1. **Agrupación y Subtotales por Comida:**
   * Cada bloque muestra el total de Kcal, Proteínas, Carbohidratos y Grasas consumidos en esa toma:
     * *Ejemplo: 🌅 Desayuno — 480 kcal | P: 38g · C: 55g · G: 12g*.
2. **Badges Visuales en las Filas:**
   * Los alimentos que tengan un timing activo muestran una etiqueta compacta y distintiva:
     * `[⚡ Pre]` (amarillo/ámbar)
     * `[🔥 Intra]` (naranja/rojo)
     * `[💪 Post]` (verde esmeralda)
3. **Sección Histórica ("📦 Registro General"):**
   * Los días pasados que no tengan comidas clasificadas muestran sus alimentos agrupados en este bloque general sin etiquetas forzadas, manteniendo la estética limpia y ordenada.

---

## 5. Plan de Pruebas y Validación

1. **Alta individual:** Registrar un alimento en Desayuno con timing `Pre` y verificar persistencia y badge visual.
2. **Alta de receta:** Registrar una receta en Cena con timing `Neutro` y verificar que suma a los subtotales de Cena.
3. **Reclasificación manual:** Abrir un alimento registrado mediante `#editAmountModal` y cambiarlo de Desayuno a Merienda.
4. **Acción en lote:** Seleccionar varios alimentos mediante checkbox y moverlos juntos a otra comida.
5. **Comprobación de histórico:** Cargar una copia de seguridad v5 o consultar días pasados en `Backup NutriApp.txt` y verificar que no hay errores de renderizado, que se asignan a "Registro General" y que las Kcal y macros totales del día coinciden al 100%.
