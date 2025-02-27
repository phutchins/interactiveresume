<template>
  <div class="strengths-section">
    <div v-for="(strength, index) in strengths"
         :key="index"
         class="strength-card"
         :style="{ '--delay': `${index * 0.1}s` }">
      <div class="strength-icon">
        <font-awesome-icon :icon="getIconForStrength(strength.title)" />
      </div>
      <h3>{{ strength.title }}</h3>
      <p>{{ strength.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLightbulb, faHandsHelping, faChartLine } from '@fortawesome/free-solid-svg-icons'
import type { Strength } from '../types/resume'

library.add(faLightbulb, faHandsHelping, faChartLine)

const props = defineProps<{
  strengths: Strength[]
}>()

const getIconForStrength = (title: string) => {
  const iconMap: Record<string, string> = {
    'Bringing Order to Chaos': 'lightbulb',
    'Hands-On Leader': 'hands-helping',
    'Scale and Extensibility': 'chart-line'
  }
  return iconMap[title] || 'lightbulb'
}
</script>

<style lang="scss" scoped>
.strengths-section {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.strength-card {
  background: none;
  border-bottom: 1px dashed #ddd;
  padding: 1.5rem 0;
  text-align: left;
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease forwards;
  animation-delay: var(--delay);
  opacity: 0;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    transform: none;
    box-shadow: none;

    .strength-icon {
      transform: scale(1.1);
    }
  }
}

.strength-icon {
  float: left;
  margin-right: 1rem;
  font-size: 1.5rem;
  color: var(--primary-color);
  transition: transform 0.3s ease;
}

h3 {
  color: var(--text-color);
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

p {
  color: var(--text-color);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-left: 2.5rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .strengths-section {
    grid-template-columns: 1fr;
  }
}
</style>