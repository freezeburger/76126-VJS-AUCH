<script setup lang="ts">
import { ref } from 'vue';


const props = defineProps<{
    title?: string;
    open: boolean;
}>();

const emit = defineEmits<{
    (e: 'card:open', value: boolean): void;
}>();

const open = ref(props.open);

const handleToggle = () => {
    open.value = !open.value;
    emit('card:open', open.value);
};

</script>

<template>

    <div class="card">
        <header>
            <h2>{{ title ? title : 'Default Card Title' }}</h2>
            <!-- <button @click="open = !open; $emit('card:open', open)">X</button> -->
            <button @click="handleToggle"></button>
        </header>
        <main :class="{ 'card-open': open }">
            <slot>Default Card Content</slot>
        </main>
    </div>

</template>

<style scoped>
/* ---------- Thème & tokens ---------- */
.card {
  --card-bg: #fff;
  --card-fg: #1f2937;           /* gris foncé lisible */
  --card-border: #e5e7eb;       /* gris clair */
  --card-accent: #3b82f6;       /* bleu pour focus */
  --card-radius: 14px;
  --card-shadow: 0 8px 22px rgba(0,0,0,.08), 0 2px 8px rgba(0,0,0,.06);
  --card-pad: 14px;
  --card-gap: 10px;
  --card-max: 100dvh;           /* hauteur ouverte max (adaptable) */
  --card-transition: 220ms cubic-bezier(.2,.7,.2,1);
  color: var(--card-fg);
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
  overflow: hidden;             /* arrondis propres */
  will-change: transform;
}

@media (prefers-color-scheme: dark) {
  .card {
    --card-bg: #0b0f14;
    --card-fg: #e5e7eb;
    --card-border: #1f2937;
    --card-shadow: 0 12px 30px rgba(0,0,0,.45), 0 3px 10px rgba(0,0,0,.35);
  }
}

/* ---------- En-tête ---------- */
.card > header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--card-gap);
  padding: calc(var(--card-pad) + 2px) calc(var(--card-pad) + 4px);
  background:
    linear-gradient(180deg, rgba(0,0,0,.03), transparent 60%);
}

.card h2 {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 650;
  letter-spacing: .2px;
  line-height: 1.15;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ---------- Bouton ---------- */
.card header > button {
  -webkit-appearance: none;
  appearance: none;
  border: 0;
  background: transparent;
  padding: 6px;
  border-radius: 10px;
  line-height: 0;
  width: 34px;
  height: 34px;
  display: inline-grid;
  place-items: center;
  cursor: pointer;
  transition: background var(--card-transition), transform 120ms ease;
}

.card header > button::before {
  content: "×";
  font-size: 20px;
  transform: translateY(-1px);
  opacity: .9;
}

.card header > button:hover {
  background: rgba(0,0,0,.06);
}

@media (prefers-color-scheme: dark) {
  .card header > button:hover {
    background: rgba(255,255,255,.08);
  }
}

.card header > button:active {
  transform: scale(.96);
}

.card header > button:focus-visible {
  outline: 2px solid transparent;
  box-shadow:
    0 0 0 2px color-mix(in oklab, var(--card-accent) 60%, transparent),
    0 0 0 6px color-mix(in oklab, var(--card-accent) 22%, transparent);
}

/* ---------- Corps (zone extensible) ---------- */
.card > main {
  /* Astuce "max-height" + padding + opacité */
  max-height: 0;
  overflow: hidden;
  padding-inline: calc(var(--card-pad) + 4px);
  padding-block: 0;
  border-top: 1px solid transparent;
  opacity: 0;
  transition:
    max-height var(--card-transition),
    opacity var(--card-transition),
    padding var(--card-transition),
    border-color var(--card-transition);
}

/* Quand ouvert */
.card > main.card-open {
  max-height: var(--card-max);
  padding-block: calc(var(--card-pad) + 2px) calc(var(--card-pad) + 10px);
  border-top-color: var(--card-border);
  opacity: 1;
}

/* Typo & lisibilité du contenu */
.card > main :where(p, ul, ol) {
  margin: .4rem 0;
}

.card > main :where(code, pre) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
  background: color-mix(in oklab, var(--card-fg) 6%, var(--card-bg));
  border: 1px solid color-mix(in oklab, var(--card-fg) 12%, var(--card-bg));
  border-radius: 10px;
  padding: .35rem .55rem;
}

/* Effets subtils au survol de la carte */
.card:hover {
  transform: translateY(-1px);
  box-shadow:
    0 10px 26px rgba(0,0,0,.10),
    0 3px 10px rgba(0,0,0,.06);
}

/* Accessibilité & confort utilisateur */
@media (prefers-reduced-motion: reduce) {
  .card,
  .card > main,
  .card header > button {
    transition: none !important;
  }
}
</style>
