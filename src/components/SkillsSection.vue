<template>
  <div class="skills-section">
    <div class="skills-grid">
      <div v-for="category in categories" :key="category.name" class="skill-category">
        <button class="category-header" type="button" @click="toggleCategory(category.name)"
                :aria-expanded="Boolean(expandedCategories[category.name])">
          <span>{{ category.name }}</span>
          <font-awesome-icon
            :icon="['fas', 'chevron-right']"
            class="toggle-icon"
            :class="{ 'rotated': expandedCategories[category.name] }"
          />
        </button>
        <p v-if="category.note" class="category-note">{{ category.note }}</p>
        <transition
          name="expand"
          @enter="startTransition"
          @after-enter="endTransition"
          @before-leave="startTransition"
          @after-leave="endTransition"
        >
          <div v-if="!expandedCategories[category.name]" class="skills-preview">
            {{ category.skills.join(', ') }}
          </div>
          <ul v-else class="skills-list">
            <li v-for="skill in category.skills"
                :key="skill"
                class="skill-item">
              {{ skill }}
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { ref } from 'vue'
import type { SkillCategory } from '../types/resume'

library.add(faChevronRight, faChevronDown)

defineProps<{ categories: SkillCategory[] }>()
const expandedCategories = ref<Record<string, boolean>>({})

const toggleCategory = (category: string) => {
  expandedCategories.value[category] = !expandedCategories.value[category]
}

const startTransition = (element: Element, done?: () => void) => {
  const htmlElement = element as HTMLElement
  const height = htmlElement.scrollHeight
  htmlElement.style.height = '0'
  // Force reflow
  htmlElement.offsetHeight
  htmlElement.style.height = `${height}px`
  htmlElement.style.overflow = 'hidden'
  if (done) done()
}

const endTransition = (element: Element) => {
  const htmlElement = element as HTMLElement
  htmlElement.style.height = ''
  htmlElement.style.overflow = ''
}
</script>

<style lang="scss" scoped>
.skills-section {
  padding: 0;
}

.skills-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 0.75rem;
}

.skill-category {
  min-width: 0;
  .category-header {
    width: 100%;
    padding: 0;
    background: none;
    border: 0;
    border-radius: 0;
    color: inherit;
    font: inherit;
    text-align: left;
    gap: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding-bottom: 0;
    margin-bottom: 0;

    &:hover {
      span {
        color: var(--primary-color);
      }
      .toggle-icon {
        color: var(--primary-color);
      }
    }

    span {
      color: var(--text-color);
      font-size: 0.95rem;
      margin: 0;
      transition: color 0.2s ease;
    }
  }
}

.category-note {
  font-size: 0.85rem;
  color: var(--secondary-color);
  text-align: left;
  margin: 0.15rem 0;
}

.toggle-icon {
  color: var(--secondary-color);
  font-size: 0.85rem;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  width: 16px;
  flex-shrink: 0;

  &.rotated {
    transform: rotate(90deg);
  }
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.expand-enter-to,
.expand-leave-from {
  height: auto;
  opacity: 1;
  transform: translateY(0);
}

.skills-preview,
.skills-list {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.skills-preview {
  color: var(--text-color);
  font-size: 0.85rem;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0;
  margin-top: 0.1rem;
  text-align: left;
  width: 100%;
  display: block;
  transform-origin: top;
}

.skills-list {
  list-style: none;
  padding: 0;
  margin: 0.1rem 0 0 0;
  columns: 2;
  column-gap: 2rem;
  transform-origin: top;
}

.skill-item {
  padding: 0.25rem 0;
  color: var(--text-color);
  text-align: left;
  position: relative;
  padding-left: 1.5rem;
  break-inside: avoid;
  font-size: 0.85rem;
  line-height: 1.2;

  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: var(--primary-color);
  }
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.75rem;
  }

  .skills-list {
    columns: 2;
  }
}

@media (max-width: 480px) {
  .skills-list {
    columns: 1;
  }
}
</style>