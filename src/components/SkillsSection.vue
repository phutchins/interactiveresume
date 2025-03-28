<template>
  <div class="skills-section">
    <div class="skills-grid">
      <div v-for="category in categories" :key="category" class="skill-category">
        <div class="category-header" @click="toggleCategory(category)">
          <h3>{{ category }}</h3>
          <font-awesome-icon
            :icon="['fas', expandedCategories[category] ? 'chevron-down' : 'chevron-right']"
            class="toggle-icon"
            :class="{ 'rotated': expandedCategories[category] }"
          />
        </div>
        <transition
          name="expand"
          @enter="startTransition"
          @after-enter="endTransition"
          @before-leave="startTransition"
          @after-leave="endTransition"
        >
          <div v-if="!expandedCategories[category]" class="skills-preview">
            {{ getPreviewText(category) }}
          </div>
          <ul v-else class="skills-list">
            <li v-for="skill in getSkillsByCategory(category)"
                :key="skill.name"
                class="skill-item">
              {{ skill.name }}
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
import { computed, ref } from 'vue'

library.add(faChevronRight, faChevronDown)

interface Skill {
  name: string
  category: string
}

const skills: Skill[] = [
  // Leadership & Management
  { name: 'Engineering Leadership', category: 'Leadership' },
  { name: 'Team Building', category: 'Leadership' },
  { name: 'Strategic Planning', category: 'Leadership' },
  { name: 'Mentoring', category: 'Leadership' },
  { name: 'Project Management', category: 'Leadership' },
  { name: 'Process Improvement', category: 'Leadership' },

  // Technical Skills
  { name: 'System Architecture', category: 'Technical' },
  { name: 'Cloud Computing', category: 'Technical' },
  { name: 'DevOps', category: 'Technical' },
  { name: 'Security', category: 'Technical' },
  { name: 'API Design', category: 'Technical' },
  { name: 'Microservices', category: 'Technical' },

  // Programming
  { name: 'Python', category: 'Programming' },
  { name: 'JavaScript/TypeScript', category: 'Programming' },
  { name: 'Go', category: 'Programming' },
  { name: 'Ruby', category: 'Programming' },
  { name: 'Java', category: 'Programming' },
  { name: 'SQL', category: 'Programming' },

  // Infrastructure
  { name: 'AWS', category: 'Infrastructure' },
  { name: 'Kubernetes', category: 'Infrastructure' },
  { name: 'Docker', category: 'Infrastructure' },
  { name: 'Terraform', category: 'Infrastructure' },
  { name: 'CI/CD', category: 'Infrastructure' },
  { name: 'Monitoring', category: 'Infrastructure' },

  // Business
  { name: 'Product Strategy', category: 'Business' },
  { name: 'Stakeholder Management', category: 'Business' },
  { name: 'Budget Management', category: 'Business' },
  { name: 'Cross-functional Collaboration', category: 'Business' },
  { name: 'Technical Writing', category: 'Business' },
  { name: 'Presentations', category: 'Business' }
]

const categories = computed(() => [...new Set(skills.map(skill => skill.category))])
const expandedCategories = ref(Object.fromEntries(categories.value.map(category => [category, false])))

const getSkillsByCategory = (category: string) => {
  return skills.filter(skill => skill.category === category)
}

const toggleCategory = (category: string) => {
  expandedCategories.value[category] = !expandedCategories.value[category]
}

const getPreviewText = (category: string) => {
  const categorySkills = getSkillsByCategory(category)
  return categorySkills.map(skill => skill.name).join(', ')
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.75rem;
}

.skill-category {
  .category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding-bottom: 0;
    margin-bottom: 0;

    &:hover {
      h3 {
        color: var(--primary-color);
      }
      .toggle-icon {
        color: var(--primary-color);
      }
    }

    h3 {
      color: var(--text-color);
      font-size: 0.95rem;
      margin: 0;
      transition: color 0.2s ease;
    }
  }
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
    grid-template-columns: 1fr;
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