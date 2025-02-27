<template>
  <div class="advisory-section">
    <div v-for="(role, index) in advisoryRoles"
         :key="index"
         class="advisory-card"
         :style="{ '--delay': `${index * 0.2}s` }">
      <div class="advisory-icon">
        <font-awesome-icon icon="building" />
      </div>
      <div class="advisory-content">
        <h3>{{ role.company }}</h3>
        <p>{{ role.role }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import type { Advisory } from '../types/resume'

library.add(faBuilding)

const advisoryRoles: Advisory[] = [
  {
    company: 'Verady',
    role: 'Board of Advisors'
  },
  {
    company: 'Storj Labs',
    role: 'Board of Advisors'
  }
]
</script>

<style lang="scss" scoped>
.advisory-section {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.advisory-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  background: none;
  border-bottom: 1px dashed #ddd;
  transition: all 0.3s ease;
  animation: slideIn 0.5s ease forwards;
  animation-delay: var(--delay);
  opacity: 0;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    transform: none;
    background: none;

    .advisory-icon {
      transform: scale(1.1);
      color: var(--primary-color);
    }
  }
}

.advisory-icon {
  font-size: 1.5rem;
  color: var(--secondary-color);
  transition: all 0.3s ease;
}

.advisory-content {
  h3 {
    font-size: 1.1rem;
    color: var(--primary-color);
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.9rem;
    color: var(--secondary-color);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>