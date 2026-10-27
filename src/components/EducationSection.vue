<script setup lang="ts">
import type { Education } from '../types/resume'

defineProps<{ education: Education[] }>()
</script>

<template>
  <article v-for="entry in education" :key="entry.school" class="education-entry">
    <h3>{{ entry.school }}</h3>
    <p>{{ entry.studies }} | {{ entry.dates }}</p>
    <p class="education-note">{{ entry.note }}</p>
  </article>
</template>

<style scoped>
.education-entry { text-align: left; }
h3 { color: var(--primary-color); font-size: 0.95rem; margin-bottom: 0.35rem; }
p { font-size: 0.85rem; line-height: 1.4; }
.education-note { color: var(--secondary-color); margin-top: 0.35rem; }
</style>
