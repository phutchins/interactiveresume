<template>
  <div>
    <div class="actions">
      <a :href="currentVersion.content.profile.resumePdf" download class="download-btn" title="Download Resume PDF" aria-label="Download resume PDF">
        <font-awesome-icon :icon="['fas', 'file-pdf']" />
      </a>
      <button class="theme-toggle" type="button" @click="emit('toggle-dark-mode')"
              :class="{ active: isDarkMode }" :aria-pressed="isDarkMode" aria-label="Toggle dark mode">
        <span class="toggle-dot"></span>
      </button>
    </div>

    <div class="resume">
      <header class="header">
        <div class="header-content">
          <div class="header-left">
            <div class="name-row">
              <h1>{{ currentVersion.content.profile.name.toUpperCase() }}</h1>
            </div>
            <h2>{{ currentVersion.content.profile.title }}</h2>
            <p class="profile-focus">{{ currentVersion.content.profile.focus }}</p>
            <div class="typing-effect" aria-hidden="true">
              <span class="prompt">$ </span>
              <span class="typed-text">{{ currentOneLiner }}</span>
              <span class="cursor" :class="{ 'typing': isTyping }"></span>
            </div>
            <div class="contact-info">
              <a :href="`mailto:${currentVersion.content.profile.email}`" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fas', 'envelope']" /> {{ currentVersion.content.profile.email }}
              </a>
              <a :href="currentVersion.content.profile.phoneHref" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fas', 'phone']" /> {{ currentVersion.content.profile.phone }}
              </a>
              <a :href="currentVersion.content.profile.linkedin" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fab', 'linkedin']" /> LinkedIn
              </a>
              <a :href="currentVersion.content.profile.locationHref" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fas', 'location-dot']" /> {{ currentVersion.content.profile.location }}
              </a>
              <a :href="currentVersion.content.profile.website" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fas', 'globe']" /> {{ currentVersion.content.profile.website.replace(/^https?:\/\//, '').replace(/\/$/, '') }}
              </a>
            </div>
          </div>
          <div class="header-right">
            <div class="profile-image">
              <img src="../assets/profile-photo.jpeg" :alt="currentVersion.content.profile.name" />
            </div>
          </div>
        </div>
      </header>

      <main class="main-content">
        <div v-if="currentVersion.sections.experience" class="left-column">
          <section class="experience">
            <h2>EXPERIENCE</h2>
            <ExperienceSection :key="currentVersion.name" :jobs="currentVersion.content.experience" />
          </section>
        </div>

        <div class="right-column">
          <section v-if="currentVersion.sections.summary" class="summary">
            <h2>SUMMARY</h2>
            <p>{{ currentVersion.content.summary }}</p>
          </section>

          <section v-if="currentVersion.sections.strengths" class="strengths">
            <h2>STRENGTHS</h2>
            <StrengthsSection :strengths="currentVersion.content.strengths" />
          </section>

          <template v-if="currentVersion.sections.projects">
            <section class="projects">
              <h2>MOBILE APPS</h2>
              <p class="section-intro">Published iOS apps and Android development</p>
              <ProjectsSection :projects="currentVersion.content.projects.filter(project => project.kind === 'mobile')" />
            </section>
            <section class="projects">
              <h2>MOBILE FIRST WEB</h2>
              <ProjectsSection :projects="currentVersion.content.projects.filter(project => project.kind === 'web')" />
            </section>
          </template>

          <section v-if="currentVersion.sections.skills" class="skills">
            <h2>TECHNICAL SKILLS</h2>
            <SkillsSection :key="currentVersion.name" :categories="currentVersion.content.skills" />
          </section>

          <section v-if="currentVersion.sections.education" class="education">
            <h2>EDUCATION</h2>
            <EducationSection :education="currentVersion.content.education" />
          </section>

          <section v-if="currentVersion.sections.advisory" class="advisory-roles">
            <h2>ADVISORY ROLES</h2>
            <AdvisorySection :advisory-roles="currentVersion.content.advisory" />
          </section>
        </div>
      </main>

      <footer class="footer-credit">
        <p>Built by {{ currentVersion.content.profile.name }} • <a href="https://github.com/phutchins/interactiveresume" target="_blank" rel="noopener noreferrer">View Source</a></p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faFilePdf, faGlobe, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { resumeVersions } from '../config/resumeVersions'
import AdvisorySection from './AdvisorySection.vue'
import EducationSection from './EducationSection.vue'
import ExperienceSection from './ExperienceSection.vue'
import ProjectsSection from './ProjectsSection.vue'
import SkillsSection from './SkillsSection.vue'
import StrengthsSection from './StrengthsSection.vue'

library.add(faEnvelope, faPhone, faLocationDot, faLinkedin, faFilePdf, faGlobe)

const route = useRoute()
const currentVersion = computed(() => {
  const versionId = route.query.version
  return typeof versionId === 'string' && Object.prototype.hasOwnProperty.call(resumeVersions, versionId)
    ? resumeVersions[versionId]
    : resumeVersions.default
})
const currentOneLiner = ref('')
const isTyping = ref(true)

onMounted(() => {
  watch(() => currentVersion.value.oneLiners, (lines, _previous, onCleanup) => {
    currentOneLiner.value = ''
    if (!lines.length) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      currentOneLiner.value = lines[0]
      isTyping.value = false
      return
    }

    let lineIndex = 0
    let deleting = false
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const line = lines[lineIndex]
      const length = currentOneLiner.value.length + (deleting ? -1 : 1)
      currentOneLiner.value = line.slice(0, length)
      isTyping.value = true
      let delay = deleting ? 30 : 50
      if (!deleting && length === line.length) {
        isTyping.value = false
        deleting = true
        delay = 2000
      } else if (deleting && length === 0) {
        deleting = false
        lineIndex = (lineIndex + 1) % lines.length
      }
      timer = setTimeout(tick, delay)
    }
    tick()
    onCleanup(() => clearTimeout(timer))
  }, { immediate: true })
})

defineProps<{ isDarkMode: boolean }>()
const emit = defineEmits<{ (e: 'toggle-dark-mode'): void }>()
</script>

<style lang="scss" scoped>
.actions {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 100;
}

.resume {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  position: relative;
  padding-top: 4rem;
  box-sizing: border-box;
  overflow-x: hidden;
}

.header {
  margin-bottom: 1rem;
  width: 100%;

  &-content {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 2rem;
    width: 100%;
    box-sizing: border-box;
  }

  &-left {
    flex: 1;
    text-align: left;
    min-width: 0; // This helps with text overflow
    max-width: calc(100% - 220px);

    .name-row {
      width: 100%;

      h1 {
        width: 100%;
        text-align: left;
      }
    }

    h2 {
      width: 100%;
      text-align: left;
    }
  }

  &-right {
    width: 200px;
    flex-shrink: 0;
  }
}

.profile-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-weight: bold;
}

h2 {
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: 600;
}

section {
  h2 {
    text-align: left;
    color: var(--text-color);
    border-bottom: 3px solid var(--text-color);
    padding-bottom: 0.05rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  &.summary {
    p {
      margin-top: 0.5rem;
      text-align: left;
      text-justify: inter-word;
      font-size: 0.85rem;
      line-height: 1.2;
    }
  }

  &.strengths {
    h2 {
      margin-bottom: 0.1rem;
    }
  }
}

.typing-effect {
  min-height: 2rem;
  margin: 1rem 0;
  font-style: normal;
  color: var(--text-color);
  font-family: 'Courier New', monospace;
  background-color: rgba(var(--primary-color-rgb), 0.05);
  padding: 0.75rem;
  border-radius: 4px;
  display: flex;
  align-items: center;

  .prompt {
    color: var(--primary-color);
    margin-right: 0.75rem;
  }

  .typed-text {
    margin-right: 2px;
  }

  .cursor {
    display: inline-block;
    width: 8px;
    height: 1.2rem;
    background-color: var(--text-color);
    animation: blink 1s infinite;
    margin-left: 2px;
    opacity: 0.7;

    &.typing {
      animation: none;
      opacity: 1;
    }
  }
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  font-size: 0.9rem;

  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-color);
    text-decoration: none;
    transition: all 0.3s ease;
    padding: 0.2rem 0.4rem;
    border-radius: 2px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: var(--primary-color);
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    &:hover {
      color: var(--primary-color);
      background-color: rgba(var(--primary-color-rgb), 0.05);

      &::after {
        transform: scaleX(1);
      }
    }

    svg {
      color: var(--primary-color);
    }
  }
}

.profile-focus,
.section-intro {
  color: var(--secondary-color);
  font-size: 0.85rem;
  text-align: left;
  line-height: 1.4;
}

.main-content {
  display: flex;
  gap: 3rem;

  .left-column {
    flex: 3;
    min-width: 0;
  }

  .right-column {
    flex: 2;
    min-width: 0;
  }
}

section {
  margin-bottom: 2.5rem;
  padding: 0;
  background: none;
  border-radius: 0;
  transition: none;

  &:hover {
    transform: none;
  }
}

@keyframes blink {
  0%, 100% { opacity: 0; }
  50% { opacity: 0.7; }
}

@media (max-width: 768px) {
  .resume {
    width: 100%;
    max-width: 100%;
    padding: 0.75rem;
    padding-top: 3rem;
    margin: 0;
    overflow-x: hidden;
  }

  .main-content {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 100%;
    padding: 0;
    margin: 0;
    overflow-x: hidden;

    .left-column,
    .right-column {
      width: 100%;
      padding: 0;
      margin: 0;
    }
  }

  .header {
    margin: 0;
    padding: 0;
    width: 100%;

    &-content {
      gap: 1rem;
      padding: 0;
      margin: 0;
      width: 100%;
    }
  }

  section {
    margin-bottom: 1.5rem;
    width: 100%;
    padding: 0;
  }

  .typing-effect {
    min-height: 4.5rem;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    margin: 1rem 0;
  }

  .header-left { max-width: calc(100% - 136px); }
  .header-right { width: 120px; }
  .profile-image { width: 120px; height: 120px; }

  .contact-info {
    width: 100%;
    max-width: 100%;
    justify-content: center;
  }

  .actions {
    top: 0.5rem;
    right: 0.5rem;
  }
}

@media (max-width: 480px) {
  .resume {
    padding: 0.75rem;
    padding-top: 3rem;
  }

  .header-right { width: 80px; }
  .profile-image { width: 80px; height: 80px; }
  .header-left { max-width: calc(100% - 96px); }

  .header {
    &-content {
      .header-left {
        h1 {
          font-size: 1.5rem;
        }
      }
    }
  }

  .contact-info {
    padding: 0;
    margin-top: 0.5rem;
    gap: 0.25rem;
    justify-content: flex-start;
    width: 100%;

    a {
      font-size: 0.75rem;
      padding: 0.1rem 0.25rem;
    }
  }

  .job-meta {
    min-width: unset;
    width: 100%;
    font-size: 0.8rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cursor { animation: none; }
}

.name-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.1rem;
}

.theme-toggle {
  margin-left: 1rem;
  border: 0;
  flex-shrink: 0;
}

.download-btn {
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(var(--primary-color-rgb), 0.1);
    color: var(--primary-color);
  }

  svg {
    font-size: 1rem;
  }
}

.footer-credit {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px dashed rgba(128, 128, 128, 0.2);
  text-align: center;

  p {
    font-size: 0.75rem;
    color: var(--secondary-color);
    margin: 0;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
