<template>
  <div class="resume">
    <header class="header">
      <div class="header-content">
        <div class="header-left">
          <h1>PHILIP HUTCHINS</h1>
          <h2>Engineering & Technology Leader</h2>
          <div class="typing-effect">
            <span class="typed-text">{{ currentOneLiner }}</span>
            <span class="cursor" :class="{ 'typing': isTyping }">|</span>
          </div>
          <div class="contact-info">
            <a href="mailto:flipture@gmail.com">
              <font-awesome-icon :icon="['fas', 'envelope']" /> flipture@gmail.com
            </a>
            <a href="tel:678-361-6518">
              <font-awesome-icon :icon="['fas', 'phone']" /> 678 361-6518
            </a>
            <a href="https://www.linkedin.com/in/philiphutchins" target="_blank">
              <font-awesome-icon :icon="['fab', 'linkedin']" /> LinkedIn
            </a>
            <span>
              <font-awesome-icon :icon="['fas', 'location-dot']" /> Atlanta
            </span>
          </div>
        </div>
        <div class="header-right">
          <div class="profile-image">
            <img src="../assets/placeholder-profile.png" alt="Philip Hutchins" />
          </div>
        </div>
      </div>
    </header>

    <main class="main-content">
      <div class="left-column">
        <section class="experience">
          <h2>EXPERIENCE</h2>
          <ExperienceSection />
        </section>
      </div>

      <div class="right-column">
        <section class="summary">
          <h2>SUMMARY</h2>
          <p>{{ currentVersion.content.summary }}</p>
        </section>

        <section class="strengths">
          <h2>STRENGTHS</h2>
          <StrengthsSection :strengths="currentVersion.content.strengths" />
        </section>

        <section class="skills">
          <h2>SKILLS</h2>
          <SkillsSection />
        </section>

        <section class="advisory-roles">
          <h2>ADVISORY ROLES</h2>
          <AdvisorySection />
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { resumeVersions } from '../config/resumeVersions'
import ExperienceSection from './ExperienceSection.vue'
import StrengthsSection from './StrengthsSection.vue'
import SkillsSection from './SkillsSection.vue'
import AdvisorySection from './AdvisorySection.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

library.add(faEnvelope, faPhone, faLocationDot, faLinkedin)

const route = useRoute()
const currentVersion = ref(resumeVersions.default)
const currentOneLiner = ref('')
const isTyping = ref(true)
let currentLineIndex = 0

const typeText = async (text: string) => {
  isTyping.value = true
  currentOneLiner.value = ''
  for (let i = 0; i < text.length; i++) {
    currentOneLiner.value += text[i]
    await new Promise(resolve => setTimeout(resolve, 50))
  }
  isTyping.value = false
  await new Promise(resolve => setTimeout(resolve, 2000))
  await backspaceText()
}

const backspaceText = async () => {
  isTyping.value = true
  while (currentOneLiner.value.length > 0) {
    currentOneLiner.value = currentOneLiner.value.slice(0, -1)
    await new Promise(resolve => setTimeout(resolve, 30))
  }
  currentLineIndex = (currentLineIndex + 1) % currentVersion.value.oneLiners.length
  await typeText(currentVersion.value.oneLiners[currentLineIndex])
}

onMounted(() => {
  const versionId = route.query.version as string
  if (versionId && resumeVersions[versionId]) {
    currentVersion.value = resumeVersions[versionId]
  }
  typeText(currentVersion.value.oneLiners[0])
})
</script>

<style lang="scss" scoped>
.resume {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  margin-bottom: 3rem;

  &-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  &-left {
    flex: 1;
    text-align: left;

    h1, h2 {
      text-align: left;
    }
  }

  &-right {
    flex: 0 0 200px;
    margin-left: 2rem;
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
  text-transform: uppercase;
  font-weight: normal;
}

section {
  h2 {
    text-align: left;
    color: var(--text-color);
    border-bottom: 3px solid var(--text-color);
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
    font-weight: bold;
  }
}

.typing-effect {
  min-height: 2rem;
  margin: 1rem 0;
  font-style: italic;
  color: var(--secondary-color);

  .cursor {
    display: inline-block;
    width: 2px;
    animation: blink 1s infinite;
    margin-left: 2px;

    &.typing {
      animation: none;
    }
  }
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  font-size: 0.9rem;

  a, span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-color);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: var(--primary-color);
    }
  }
}

.main-content {
  display: flex;
  gap: 3rem;

  .left-column {
    flex: 3;
  }

  .right-column {
    flex: 2;
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
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }

  .header-content {
    flex-direction: column;
    align-items: center;

    .header-left {
      text-align: center;

      h1, h2 {
        text-align: center;
      }
    }

    .header-right {
      margin: 2rem 0;
    }
  }

  .contact-info {
    justify-content: center;
  }

  section h2 {
    text-align: center;
  }
}
</style>