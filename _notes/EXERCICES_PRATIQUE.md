# Exercices Vue 3 + TypeScript — Composants simples

> 5 exercices progressifs pour débutants.  
> Chaque énoncé précise ses objectifs et inclut une correction concise masquée.

---

## Exercice 1 — `HelloName` (props & template)

**Objectif :**
- Déclarer et typer des `props`.
- Afficher une valeur dans le template.
- Utiliser une `computed` simple.

**Énoncé :**
Créez un composant `HelloName.vue` qui :
- Accepte une prop obligatoire `name: string`.
- Affiche “Bonjour, {NAME} !” avec `NAME` en **majuscule**.
- Si `name` est une chaîne vide, affiche “Bonjour, Anonyme !”.

**Critères d’acceptation :**
- `name="Renaud"` → “Bonjour, RENAUD !”
- `name=""` → “Bonjour, Anonyme !”

<details>
<summary>Correction</summary>

```vue
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  name: string
}>();

const displayName = computed(() =>
  props.name?.trim() ? props.name.trim().toUpperCase() : 'Anonyme'
);
</script>

<template>
  <p>Bonjour, {{ displayName }} !</p>
</template>
```
</details>

---

## Exercice 2 — `CounterButton` (emits & v-model personnalisé)

**Objectif :**
- Déclarer et typer `emits`.
- Supporter un `v-model` personnalisé (`v-model:count`).
- Utiliser un paramètre `step`.

**Énoncé :**
Créez `CounterButton.vue` qui :
- Reçoit `count: number` (pour `v-model:count`) et `step?: number` (défaut 1).
- Émet `update:count` avec la nouvelle valeur à chaque clic.
- Affiche le nombre courant.

**Critères d’acceptation :**
- Clics successifs incrémentent `count` de `step`.
- Compatible : `<CounterButton v-model:count="n" :step="2" />`.

<details>
<summary>Correction</summary>

```vue
<script setup lang="ts">
const props = withDefaults(defineProps<{
  count: number
  step?: number
}>(), {
  step: 1
});

const emit = defineEmits<{
  (e: 'update:count', value: number): void
}>();

function inc() {
  emit('update:count', props.count + props.step);
}
</script>

<template>
  <button type="button" @click="inc">
    Compteur : {{ count }}
  </button>
</template>
```
</details>

---

## Exercice 3 — `ToggleSwitch` (accessibilité clavier, v-model booléen)

**Objectif :**
- Gérer `v-model` standard (`modelValue` / `update:modelValue`).
- Gérer l’accessibilité clavier (Espace/Entrée).
- Désactiver l’interaction via `disabled`.

**Énoncé :**
Créez `ToggleSwitch.vue` qui :
- Accepte `modelValue: boolean`, `disabled?: boolean` (défaut `false`).
- Émet `update:modelValue` au clic ou clavier (Espace/Entrée).
- Applique `aria-pressed`, `role="button"`, et `tabindex="0"` (si non disabled).
- Ajoute une classe `.on` quand actif, `.off` sinon.

**Critères d’acceptation :**
- Click/Space/Enter → inversion de l’état (sauf si `disabled`).
- Props/Emits correctement typés.

<details>
<summary>Correction</summary>

```vue
<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: boolean
  disabled?: boolean
}>(), {
  disabled: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>();

function toggle() {
  if (props.disabled) return;
  emit('update:modelValue', !props.modelValue);
}

function onKey(e: KeyboardEvent) {
  if (props.disabled) return;
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    toggle();
  }
}
</script>

<template>
  <div
    :class="['toggle', modelValue ? 'on' : 'off', { disabled }]"
    role="button"
    :aria-pressed="modelValue"
    :tabindex="disabled ? -1 : 0"
    @click="toggle"
    @keydown="onKey"
  >
    <span>{{ modelValue ? 'ON' : 'OFF' }}</span>
  </div>
</template>

<style scoped>
.toggle { display:inline-flex; align-items:center; padding:0.25rem 0.5rem; border:1px solid #ccc; border-radius:999px; user-select:none; cursor:pointer; }
.toggle.on { background:#e6ffe6; }
.toggle.off { background:#ffecec; }
.toggle.disabled { opacity:0.6; cursor:not-allowed; }
</style>
```
</details>

---

## Exercice 4 — `ListFilter` (v-model local, computed, slot d’item, emit `select`)

**Objectif :**
- Filtrer une liste via un champ de recherche local (`v-model` interne).
- Utiliser une `computed` pour le filtrage insensible à la casse.
- Émettre `select` avec l’élément cliqué.
- Fournir un slot `item` (optionnel) avec `slotProps: { item: string }`.

**Énoncé :**
Créez `ListFilter.vue` qui :
- Reçoit `items: string[]`.
- Affiche un `<input>` pour filtrer.
- Liste les résultats (ou “Aucun résultat”).
- Au clic sur un élément, émet `(e: 'select', item: string)`.
- Si un slot `item` est fourni, l’utiliser pour le rendu d’un élément.

**Critères d’acceptation :**
- Filtrage réactif.
- Slot optionnel correctement typé.

<details>
<summary>Correction</summary>

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  items: string[]
}>();

const emit = defineEmits<{
  (e: 'select', item: string): void
}>();

const q = ref('');

const filtered = computed(() => {
  const s = q.value.trim().toLowerCase();
  if (!s) return props.items;
  return props.items.filter(it => it.toLowerCase().includes(s));
});

function choose(item: string) {
  emit('select', item);
}
</script>

<template>
  <div>
    <input v-model="q" type="text" placeholder="Filtrer..." />
    <ul v-if="filtered.length">
      <li v-for="it in filtered" :key="it" @click="choose(it)" style="cursor:pointer">
        <slot name="item" :item="it">{{ it }}</slot>
      </li>
    </ul>
    <p v-else>Aucun résultat</p>
  </div>
</template>
```
</details>

---

## Exercice 5 — `CountdownTimer` (cycle de vie, `watch`, nettoyage, emit `finished`)

**Objectif :**
- Utiliser le cycle de vie (`onMounted`, `onBeforeUnmount`).
- Mettre en place/clear un intervalle.
- Réagir aux changements de prop via `watch`.
- Émettre `finished` lorsque le temps atteint 0.
- Offrir un slot par défaut avec la valeur restante.

**Énoncé :**
Créez `CountdownTimer.vue` qui :
- Reçoit `seconds: number` (> 0).
- Démarre un compte à rebours à `onMounted`.
- Émet `finished` quand le compteur atteint 0 et s’arrête.
- Redémarre si `seconds` change.
- Affiche la valeur restante et l’expose au slot par défaut via `slotProps: { remaining: number }`.

**Critères d’acceptation :**
- Le timer décrémente chaque seconde.
- Nettoyage d’intervalle à la destruction.
- `watch` sur `seconds` pour redémarrer.

<details>
<summary>Correction</summary>

```vue
<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps<{
  seconds: number
}>();

const emit = defineEmits<{
  (e: 'finished'): void
}>();

const remaining = ref<number>(Math.max(0, Math.floor(props.seconds)));
let handle: number | null = null;

function stop() {
  if (handle !== null) {
    clearInterval(handle);
    handle = null;
  }
}

function start() {
  stop();
  remaining.value = Math.max(0, Math.floor(props.seconds));
  if (remaining.value === 0) {
    emit('finished');
    return;
  }
  handle = window.setInterval(() => {
    if (remaining.value > 0) {
      remaining.value -= 1;
      if (remaining.value === 0) {
        emit('finished');
        stop();
      }
    }
  }, 1000);
}

watch(() => props.seconds, start);

onMounted(start);
onBeforeUnmount(stop);
</script>

<template>
  <span>
    <slot :remaining="remaining">{{ remaining }}</slot>
  </span>
</template>
```
</details>
