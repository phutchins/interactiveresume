<template>
  <div class="experience-section">
    <div v-for="(job, index) in jobs" :key="index" class="job-card" @click="toggleExpanded(index)">
      <div class="job-header">
        <div class="job-title-company">
          <h3>{{ job.title }}</h3>
          <h4>{{ job.company }}</h4>
        </div>
        <div class="job-meta">
          <span class="job-date">{{ job.startDate }} - {{ job.endDate }}</span>
          <span class="job-location">{{ job.location }}</span>
        </div>
      </div>

      <div class="job-content" :class="{ 'expanded': expandedJobs[index] }">
        <ul class="job-description">
          <li v-for="(item, i) in job.description" :key="i">{{ item }}</li>
        </ul>
        <div v-if="job.technologies" class="job-technologies">
          <span v-for="tech in job.technologies" :key="tech" class="technology-tag">
            {{ tech }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Experience } from '../types/resume'

const jobs: Experience[] = [
  {
    title: 'Chief Technology Officer',
    company: 'Proof',
    location: 'Remote / Miami, FL',
    startDate: '04/2022',
    endDate: '07/2023',
    description: [
      'Boosted engineering efficiency by 25-35%, reducing development environment issues from 30-40% to under 5% and saving apx $360K-$600K annually by eliminating the need for 4-5 additional hires',
      'Shifted company from sales led to product lead growth building a platform that drove product adoption'
    ],
    technologies: ['Product Management', 'Team Leadership', 'Infrastructure']
  },
  {
    title: 'Decentralization Workstream Lead',
    company: 'Gitcoin DAO',
    location: 'Remote',
    startDate: '05/2021',
    endDate: '03/2022',
    description: [
      'Launched token and started initial workstreams forming the Gitcoin DAO',
      'Architected and built decentralized versions of Gitcoins products',
      'Built and lead team creating operations and policies from the ground up'
    ],
    technologies: ['Web3', 'Blockchain', 'Smart Contracts']
  },
  {
    title: 'Vice President of Engineering and Product',
    company: 'Gravy Solutions',
    location: 'Remote / Atlanta, GA',
    startDate: '06/2020',
    endDate: '05/2021',
    description: [
      'Increased profit margins by more than 70% by architecting and building app reducing manual work and required support',
      'Joined as individual contributor building POC hands on',
      'Recruited team to scale POC'
    ],
    technologies: ['Product Development', 'Team Building', 'Architecture']
  },
  {
    title: 'Chief Technology Officer',
    company: 'Storj Labs Inc.',
    location: 'Atlanta, GA / Remote',
    startDate: '03/2016',
    endDate: '12/2019',
    description: [
      'Joined as 3rd employee handling security, deployments, and product direction',
      'Lead successful in-house token sale, distribution, and conversion with 0 security incidents raising 30M in funding',
      'Built teams growing company to over 50 employees',
      'Launched a fully decentralized cloud storage platform surpassing performance of AWS and GCP cloud storage'
    ],
    technologies: ['Cloud Storage', 'Blockchain', 'Security']
  }
]

const expandedJobs = ref(new Array(jobs.length).fill(true))

const toggleExpanded = (index: number) => {
  expandedJobs.value[index] = !expandedJobs.value[index]
}
</script>

<style lang="scss" scoped>
.experience-section {
  display: flex;
  flex-direction: column;
  gap: 0;

  .job-card {
    padding: 1.5rem 0;
    border-bottom: 1px dashed #ddd;

    &:last-child {
      border-bottom: none;
    }
  }
}

.job-card {
  background: none;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: none;
    box-shadow: none;
  }
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.job-title-company {
  h3 {
    font-size: 1.2rem;
    color: var(--primary-color);
    margin-bottom: 0.25rem;
  }

  h4 {
    font-size: 1rem;
    color: var(--secondary-color);
  }
}

.job-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.9rem;
  color: var(--secondary-color);
}

.job-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;

  &.expanded {
    max-height: 1000px;
  }
}

.job-description {
  list-style-type: none;
  padding: 0;
  margin: 1rem 0;
  text-align: left;

  li {
    margin-bottom: 0.5rem;
    padding-left: 1.5rem;
    position: relative;
    text-align: left;

    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: var(--primary-color);
    }
  }
}

.job-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.technology-tag {
  background-color: var(--primary-color);
  color: var(--background-color);
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.8rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
}

@media (max-width: 768px) {
  .job-header {
    flex-direction: column;
    gap: 0.5rem;
  }

  .job-meta {
    align-items: flex-start;
  }
}
</style>