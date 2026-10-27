<script setup lang="ts">
import type { Project } from '../types/resume'

defineProps<{ projects: Project[] }>()
</script>

<template>
  <div class="projects-section">
    <article v-for="project in projects" :key="project.name" class="project-card">
      <h3>{{ project.name }}</h3>
      <p class="platform">{{ project.platform }}</p>
      <p>{{ project.description }}</p>
      <div v-if="project.links.length" class="project-links">
        <a v-for="link in project.links" :key="link.url" :href="link.url"
           :aria-label="`${project.name}: ${link.label}`" target="_blank" rel="noopener noreferrer">
          {{ link.label }} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  </div>
</template>

<style lang="scss" scoped>
.project-card {
  padding: 0.75rem 0;
  text-align: left;
  border-bottom: 1px dashed rgba(128, 128, 128, 0.3);

  &:first-child { padding-top: 0.25rem; }
  &:last-child { border-bottom: 0; }

  h3 {
    color: var(--primary-color);
    font-size: 0.95rem;
    margin-bottom: 0.15rem;
  }

  p {
    font-size: 0.85rem;
    line-height: 1.4;
    color: var(--text-color);
    margin-bottom: 0.35rem;
  }

  .platform { color: var(--secondary-color); }
}

.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.85rem;

  a {
    color: var(--primary-color);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
}
</style>
