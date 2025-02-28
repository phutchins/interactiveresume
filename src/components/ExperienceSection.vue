<template>
  <div class="experience-section">
    <div v-for="(job, index) in jobs" :key="index" class="job-card" :class="{ 'expanded': expandedJobs[index] }" @click="toggleExpanded(index)">
      <div class="job-header">
        <div class="job-title-company">
          <h3>{{ job.title }}</h3>
          <h4>{{ job.company }}</h4>
          <p class="company-description">{{ job.companyDescription }}</p>
        </div>
        <div class="job-meta">
          <span class="job-date">
            <font-awesome-icon :icon="['fas', 'calendar']" class="meta-icon" />
            {{ job.startDate }} - {{ job.endDate }}
          </span>
          <span class="job-location">
            <font-awesome-icon :icon="['fas', 'location-dot']" class="meta-icon" />
            {{ job.location }}
          </span>
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
      <div v-if="!expandedJobs[index]" class="preview-hint">
        <font-awesome-icon :icon="['fas', 'chevron-down']" class="chevron-icon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faChevronDown, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue';
import type { Experience } from '../types/resume';

library.add(faCalendar, faLocationDot, faChevronDown);

const jobs: Experience[] = [
  {
    title: 'Co-Founder & CEO',
    company: 'Pencil Ink (stealth startup)',
    companyDescription: 'Product & Project Management SaaS',
    location: 'Remote',
    startDate: '07/2023',
    endDate: 'Present',
    description: [
      'Bootstrapped and launched an end-to-end product & project management SaaS platform from concept to alpha with paying customers',
      'Defined go-to-market strategy, pricing models, and early sales efforts, securing initial revenue traction',
      'Spearheaded fundraising efforts, engaging with investors and accelerators to drive early-stage growth'
    ],
    technologies: ['Product Management', 'SaaS', 'Startup Leadership']
  },
  {
    title: 'Contractor',
    company: 'DIMO',
    companyDescription: 'Open Automotive Data Platform',
    location: 'Remote',
    startDate: '10/2023',
    endDate: 'Present',
    description: [
      'Designed and built deployment orchestration and automation software (DIMO Node) using Pulumi and Golang, streamlining node deployment, upgrades, and management',
      'Enabled developers to easily run and test DIMO software locally, improving development efficiency and iteration speed',
      'Facilitated decentralization by allowing partners and community members to deploy and operate their own nodes, reinforcing DIMO\'s distributed network vision'
    ],
    technologies: ['Golang', 'Pulumi', 'DevOps', 'Automation']
  },
  {
    title: 'Chief Technology Officer',
    company: 'Proof',
    companyDescription: 'Data Driven Impact Analysis',
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
    companyDescription: 'Community Funding Tools',
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
    companyDescription: 'Customer Retention',
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
    companyDescription: 'Decentralized Cloud Storage Platform',
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
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: none;
    box-shadow: none;

    &:not(.expanded) {
      .preview-hint {
        opacity: 1;
        transform: translateY(0);
      }

      .job-content {
        max-height: 45px;
        opacity: 0.4;
      }
    }
  }

  &:not(.expanded) {
    .preview-hint {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;
      opacity: 0;
      transform: translateY(5px);
      transition: all 0.3s ease;
      background: linear-gradient(to bottom, transparent, var(--background-color) 40%);
      pointer-events: none;
      z-index: 2;

      .chevron-icon {
        color: var(--primary-color);
        font-size: 1rem;
        animation: bounce 2s infinite;
      }
    }
  }
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0;
}

.job-title-company {
  h3 {
    font-size: 1.2rem;
    color: var(--text-color);
    margin-bottom: 0.1rem;
    text-align: left;
    line-height: 1.1;
    font-weight: 500;
  }

  h4 {
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
  min-width: 200px;
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
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-3px);
  }
  60% {
    transform: translateY(-2px);
  }
}
</style>