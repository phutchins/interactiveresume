<template>
  <div class="skills-section">
    <div class="skills-categories">
      <button
        v-for="category in categories"
        :key="category"
        :class="{ active: selectedCategory === category }"
        @click="selectCategory(category)"
        class="category-button"
      >
        {{ category }}
      </button>
    </div>

    <div class="skills-display">
      <div class="skills-chart">
        <Radar
          v-if="chartData"
          :data="chartData"
          :options="chartOptions"
        />
      </div>

      <div class="skills-list">
        <div
          v-for="skill in filteredSkills"
          :key="skill.name"
          class="skill-item"
          @mouseenter="highlightSkill(skill.name)"
          @mouseleave="clearHighlight"
        >
          <div class="skill-info">
            <span class="skill-name">{{ skill.name }}</span>
            <div class="skill-bar">
              <div
                class="skill-progress"
                :style="{ width: `${skill.level}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Radar } from 'vue-chartjs'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

interface Skill {
  name: string
  category: string
  level: number
}

const skills: Skill[] = [
  // Infrastructure & Cloud
  { name: 'GCP/AWS', category: 'Infrastructure', level: 95 },
  { name: 'Kubernetes', category: 'Infrastructure', level: 90 },
  { name: 'Docker', category: 'Infrastructure', level: 95 },
  { name: 'CI/CD', category: 'Infrastructure', level: 90 },

  // Development
  { name: 'JavaScript', category: 'Development', level: 90 },
  { name: 'Web3', category: 'Development', level: 85 },
  { name: 'Linux', category: 'Development', level: 90 },
  { name: 'TensorFlow', category: 'Development', level: 75 },

  // Security
  { name: 'Information Security', category: 'Security', level: 85 },
  { name: 'Data Security', category: 'Security', level: 90 },

  // Leadership
  { name: 'Product Management', category: 'Leadership', level: 90 },
  { name: 'Team Leadership', category: 'Leadership', level: 95 },
  { name: 'Developer Experience', category: 'Leadership', level: 85 }
]

const categories = [...new Set(skills.map(skill => skill.category))]
const selectedCategory = ref(categories[0])
const highlightedSkill = ref<string | null>(null)

const selectCategory = (category: string) => {
  selectedCategory.value = category
}

const highlightSkill = (skillName: string) => {
  highlightedSkill.value = skillName
}

const clearHighlight = () => {
  highlightedSkill.value = null
}

const filteredSkills = computed(() => {
  return skills.filter(skill => skill.category === selectedCategory.value)
})

const chartData = computed(() => ({
  labels: filteredSkills.value.map(skill => skill.name),
  datasets: [
    {
      label: selectedCategory.value,
      data: filteredSkills.value.map(skill => skill.level),
      backgroundColor: 'rgba(0, 150, 255, 0.2)',
      borderColor: 'rgba(0, 150, 255, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(0, 150, 255, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0, 150, 255, 1)'
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      angleLines: {
        display: true
      },
      suggestedMin: 0,
      suggestedMax: 100
    }
  }
}
</script>

<style lang="scss" scoped>
.skills-section {
  padding: 1rem;
}

.skills-categories {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.category-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background-color: rgba(var(--background-color), 0.1);
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--primary-color);
    color: var(--background-color);
  }

  &.active {
    background-color: var(--primary-color);
    color: var(--background-color);
  }
}

.skills-display {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.skills-chart {
  height: 300px;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-item {
  padding: 0.75rem 0;
  border-bottom: 1px dashed #ddd;
  transition: all 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: none;
  }
}

.skill-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skill-name {
  font-weight: 500;
  color: var(--text-color);
  text-align: left;
}

.skill-bar {
  height: 6px;
  background-color: rgba(var(--background-color), 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: 3px;
  transition: width 0.3s ease;
}

@media (max-width: 768px) {
  .skills-display {
    grid-template-columns: 1fr;
  }

  .skills-chart {
    height: 250px;
  }
}
</style>