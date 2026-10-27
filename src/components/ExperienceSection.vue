<template>
  <div class="experience-section">
    <article v-for="job in jobs" :key="job.id" class="job-card" :class="{ expanded: isExpanded(job) }">
      <button class="job-header" type="button" :disabled="!hasDetails(job)"
              :aria-label="`${job.title} at ${job.company}`"
              :aria-expanded="hasDetails(job) ? isExpanded(job) : undefined"
              :aria-controls="hasDetails(job) ? `job-${job.id}` : undefined"
              @click="toggleExpanded(job)">
        <span class="job-title-company">
          <span class="job-title">{{ job.title }}</span>
          <span class="job-company">{{ job.company }}</span>
          <span v-if="job.companyDescription" class="company-description">{{ job.companyDescription }}</span>
        </span>
        <span class="job-meta">
          <span class="job-date">
            <font-awesome-icon :icon="['fas', 'calendar']" class="meta-icon" />
            {{ job.startDate }} - {{ job.endDate }}
          </span>
          <span v-if="job.employmentType">{{ job.employmentType }}</span>
          <span class="job-location">
            <font-awesome-icon :icon="['fas', 'location-dot']" class="meta-icon" />
            {{ job.location }}
          </span>
          <font-awesome-icon v-if="hasDetails(job)" :icon="['fas', 'chevron-down']" class="expand-icon"
                             :class="{ rotated: isExpanded(job) }" />
        </span>
      </button>
      <p v-if="job.note" class="job-note">{{ job.note }}</p>
      <div v-if="hasDetails(job)" v-show="isExpanded(job)" :id="`job-${job.id}`" class="job-content expanded">
        <ul class="job-description">
          <li v-for="item in job.description" :key="item">{{ item }}</li>
        </ul>
        <div v-if="job.technologies?.length" class="job-technologies">
          <span v-for="tech in job.technologies" :key="tech" class="technology-tag">{{ tech }}</span>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faChevronDown, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue';
import type { Experience } from '../types/resume';

library.add(faCalendar, faLocationDot, faChevronDown);

defineProps<{ jobs: Experience[] }>()

// Track the stable role ID so inserting or reordering jobs cannot shift state.
const expansionOverrides = ref<Record<string, boolean>>({})
const isExpanded = (job: Experience) => expansionOverrides.value[job.id] ?? job.expandedByDefault ?? false
const hasDetails = (job: Experience) => job.description.length > 0 || Boolean(job.technologies?.length)
const toggleExpanded = (job: Experience) => {
  expansionOverrides.value[job.id] = !isExpanded(job)
}
</script>

<style lang="scss" scoped>
.experience-section {
  display: flex;
  flex-direction: column;
  gap: 0;

  .job-card {
    padding: 1rem 0;
    border-bottom: 1px dashed #ddd;

    &:first-child {
      padding-top: 0.35rem;
    }

    &:last-child {
      border-bottom: none;
    }
  }
}

.job-card {
  background: none;
  border-radius: 0;
  cursor: default;
  transition: all 0.3s ease;
  position: relative;
}

.job-header {
  width: 100%;
  padding: 0;
  background: none;
  border: 0;
  border-radius: 0;
  color: inherit;
  font: inherit;
  text-align: left;
  gap: 1rem;
  cursor: pointer;

  &:disabled {
    cursor: default;
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: -2px;
  }
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0;
}

.job-title-company {
  min-width: 0;

  > span { display: block; }
  .job-title {
    font-size: 1.2rem;
    color: var(--text-color);
    margin-bottom: 0.1rem;
    text-align: left;
    line-height: 1.1;
    font-weight: 500;
  }

  .job-company {
    font-size: 0.9rem;
    color: var(--primary-color);
    text-align: left;
    margin-bottom: 0.25rem;
    line-height: 1.1;
  }

  .company-description {
    font-size: 0.9rem;
    color: var(--secondary-color);
    text-align: left;
    margin: 0;
    margin-bottom: 0.05rem;
    line-height: 1.1;
  }
}

.job-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.9rem;
  color: var(--secondary-color);
  flex-shrink: 0;
  text-align: right;

  .job-date, .job-location {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
    width: 100%;
  }

  .meta-icon {
    color: var(--primary-color);
    width: 14px;
  }
}

.job-content {
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  opacity: 0;
  position: relative;

  &.expanded {
    max-height: 1000px;
    opacity: 1;
  }
}

.job-description {
  list-style-type: none;
  padding: 0;
  margin: 0.1rem 0;
  text-align: left;

  li {
    margin-bottom: 0.1rem;
    padding-left: 1.25rem;
    position: relative;
    text-align: left;
    font-size: 0.85rem;
    line-height: 1.2;

    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: var(--primary-color);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.job-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.technology-tag {
  font-size: 0.85rem;
  color: var(--primary-color);
  background-color: transparent;
  border: 1px solid var(--primary-color);
  padding: 0.2rem 0.5rem;
  transition: all 0.2s ease;
  letter-spacing: 0.02em;

  &:hover {
    background-color: var(--primary-color);
    color: var(--background-color);
    transform: translateY(-1px);
  }
}

@media (max-width: 768px) {
  .job-header {
    flex-direction: column;
    gap: 0.5rem;
  }

  .job-meta {
    align-items: flex-start;
    text-align: left;

    .job-date, .job-location { justify-content: flex-start; }
  }
}

.job-note {
  margin: 0.5rem 0;
  color: var(--secondary-color);
  font-size: 0.85rem;
  text-align: left;
}

.expand-icon {
  margin-top: 0.4rem;
  color: var(--primary-color);
  transition: transform 0.2s;
  &.rotated { transform: rotate(180deg); }
}

</style>
