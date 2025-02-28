<template>
  <div class="resume">
    <header class="header">
      <div class="header-content">
        <div class="header-left">
          <div class="name-row">
            <h1>PHILIP HUTCHINS</h1>
            <div class="actions">
              <div class="theme-toggle" @click="$emit('toggle-dark-mode')" :class="{ 'active': isDarkMode }">
                <div class="toggle-dot"></div>
              </div>
              <button class="download-btn" @click="downloadPDF" title="Download PDF">
                <font-awesome-icon :icon="['fas', 'download']" />
              </button>
            </div>
          </div>
          <h2>Engineering & Technology Leader</h2>
          <div class="typing-effect">
            <span class="prompt">$ </span>
            <span class="typed-text">{{ currentOneLiner }}</span>
            <span class="cursor" :class="{ 'typing': isTyping }"></span>
          </div>
          <div class="contact-info">
            <a href="mailto:flipture@gmail.com" target="_blank" rel="noopener noreferrer">
              <font-awesome-icon :icon="['fas', 'envelope']" /> flipture@gmail.com
            </a>
            <a href="tel:+16783616518" target="_blank" rel="noopener noreferrer">
              <font-awesome-icon :icon="['fas', 'phone']" /> 678-361-6518
            </a>
            <a href="https://www.linkedin.com/in/philiphutchins" target="_blank" rel="noopener noreferrer">
              <font-awesome-icon :icon="['fab', 'linkedin']" /> LinkedIn
            </a>
            <a href="https://www.google.com/maps/place/Atlanta,+GA" target="_blank" rel="noopener noreferrer">
              <font-awesome-icon :icon="['fas', 'location-dot']" /> Atlanta
            </a>
          </div>
        </div>
        <div class="header-right">
          <div class="profile-image">
            <img src="../assets/profile-photo.jpeg" alt="Philip Hutchins" />
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
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faDownload, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { resumeVersions } from '../config/resumeVersions'
import AdvisorySection from './AdvisorySection.vue'
import ExperienceSection from './ExperienceSection.vue'
import SkillsSection from './SkillsSection.vue'
import StrengthsSection from './StrengthsSection.vue'

library.add(faEnvelope, faPhone, faLocationDot, faLinkedin, faDownload)

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

const props = defineProps<{
  isDarkMode: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-dark-mode'): void
}>()

const downloadPDF = async () => {
  // Wait for any animations to complete
  await new Promise(resolve => setTimeout(resolve, 500))

  const element = document.querySelector('.resume')
  if (!element) return

  // Create a clone of the resume element
  const clone = element.cloneNode(true) as HTMLElement

  // Add PDF generation class
  clone.classList.add('generating-pdf')

  // Set up the clone for PDF generation - using the exact dimensions from the screenshot
  clone.style.width = '1152px'
  clone.style.height = '1711px'
  clone.style.padding = '32px' // Reduced padding to match screenshot
  clone.style.backgroundColor = props.isDarkMode ? '#1A1A1A' : '#FFFFFF'
  clone.style.color = props.isDarkMode ? '#FFFFFF' : '#000000'
  clone.style.position = 'absolute'
  clone.style.left = '-9999px'
  clone.style.top = '0'
  clone.style.transform = 'none'
  clone.style.transition = 'none'
  clone.style.opacity = '1'
  clone.style.visibility = 'visible'
  clone.style.overflow = 'visible'
  clone.style.display = 'block'
  clone.style.boxSizing = 'border-box'
  clone.style.fontSize = '14px' // Increased base font size

  // Temporarily append to body
  document.body.appendChild(clone)

  try {
    // Force all content to be visible and expanded
    const allElements = clone.getElementsByTagName('*')
    for (const el of allElements) {
      if (el instanceof HTMLElement) {
        el.style.maxHeight = 'none'
        el.style.overflow = 'visible'
        el.style.height = 'auto'
        el.style.display = el.tagName === 'A' ? 'inline-flex' : 'block'
        // Adjust font sizes to match screenshot
        if (el.tagName === 'H1') el.style.fontSize = '36px'
        if (el.tagName === 'H2') el.style.fontSize = '24px'
        if (el.tagName === 'H3') el.style.fontSize = '20px'
        if (el.tagName === 'H4') el.style.fontSize = '16px'
        if (el.tagName === 'P' || el.tagName === 'LI') el.style.fontSize = '14px'
      }
    }

    // Wait for all images to load
    await Promise.all(Array.from(clone.getElementsByTagName('img')).map(img => {
      if (img.complete) return Promise.resolve()
      return new Promise(resolve => {
        img.onload = resolve
        img.onerror = resolve
      })
    }))

    const canvas = await html2canvas(clone, {
      scale: 1, // No scaling needed since we're using exact dimensions
      useCORS: true,
      allowTaint: true,
      backgroundColor: props.isDarkMode ? '#1A1A1A' : '#FFFFFF',
      width: 1152,
      height: 1711,
      onclone: (clonedDoc) => {
        const style = clonedDoc.createElement('style')
        style.innerHTML = `
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
            font-family: Arial, sans-serif !important;
            box-sizing: border-box !important;
          }
          .generating-pdf {
            background-color: ${props.isDarkMode ? '#1A1A1A' : '#FFFFFF'} !important;
            color: ${props.isDarkMode ? '#FFFFFF' : '#000000'} !important;
            width: 1152px !important;
            height: 1711px !important;
            padding: 32px !important;
            box-sizing: border-box !important;
            display: block !important;
            overflow: visible !important;
          }
          .generating-pdf * {
            visibility: visible !important;
            opacity: 1 !important;
            max-height: none !important;
            overflow: visible !important;
          }
          .generating-pdf .theme-toggle,
          .generating-pdf .download-btn,
          .generating-pdf .typing-effect,
          .generating-pdf .cursor {
            display: none !important;
          }
          .generating-pdf .header-content {
            display: flex !important;
            justify-content: space-between !important;
            align-items: flex-start !important;
            gap: 2rem !important;
            margin-bottom: 2rem !important;
          }
          .generating-pdf .header-left {
            flex: 1 !important;
            max-width: 75% !important;
          }
          .generating-pdf .header-right {
            width: 150px !important;
          }
          .generating-pdf .profile-image {
            width: 150px !important;
            height: 150px !important;
          }
          .generating-pdf .main-content {
            display: flex !important;
            gap: 2rem !important;
            flex-direction: row !important;
          }
          .generating-pdf .left-column {
            flex: 1.5 !important;
            max-width: 65% !important;
          }
          .generating-pdf .right-column {
            flex: 1 !important;
            max-width: 35% !important;
          }
          .generating-pdf h1 {
            font-size: 36px !important;
            line-height: 1.2 !important;
            margin-bottom: 0.5rem !important;
            white-space: nowrap !important;
          }
          .generating-pdf h2 {
            font-size: 24px !important;
            line-height: 1.2 !important;
            margin-bottom: 0.75rem !important;
            white-space: nowrap !important;
          }
          .generating-pdf p,
          .generating-pdf li,
          .generating-pdf .contact-info a {
            font-size: 14px !important;
            line-height: 1.5 !important;
          }
          .generating-pdf .contact-info {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 1.5rem !important;
            margin-top: 1rem !important;
          }
          .generating-pdf .job-card {
            padding: 1.25rem 0 !important;
            border-bottom: 1px solid rgba(128, 128, 128, 0.2) !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            overflow: visible !important;
          }
          .generating-pdf .job-card:last-child {
            border-bottom: none !important;
          }
          .generating-pdf .job-technologies {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
            gap: 0.5rem !important;
            margin-top: 0.75rem !important;
          }
          .generating-pdf .technology-tag {
            font-size: 13px !important;
            padding: 0.25rem 0.75rem !important;
            margin: 0 !important;
            display: inline-flex !important;
            align-items: center !important;
            font-weight: normal !important;
            border: 1px solid var(--primary-color) !important;
            border-radius: 4px !important;
            color: ${props.isDarkMode ? '#66B2FF' : '#0096FF'} !important;
            background: transparent !important;
          }
          .generating-pdf p,
          .generating-pdf li,
          .generating-pdf .contact-info a,
          .generating-pdf h3,
          .generating-pdf h4 {
            font-weight: normal !important;
          }
          .generating-pdf h1 {
            font-weight: bold !important;
          }
          .generating-pdf h2 {
            font-weight: 600 !important;
          }
          .generating-pdf section h2 {
            border-bottom: 2px solid ${props.isDarkMode ? '#FFFFFF' : '#000000'} !important;
          }
          .generating-pdf .job-description {
            list-style-type: none !important;
            padding: 0 !important;
            margin: 0.75rem 0 !important;
          }
          .generating-pdf .job-description li {
            position: relative !important;
            padding-left: 1.25rem !important;
            margin-bottom: 0.5rem !important;
            line-height: 1.4 !important;
            white-space: normal !important;
            word-wrap: break-word !important;
            max-width: 100% !important;
            overflow-wrap: break-word !important;
          }
          .generating-pdf .job-description li::before {
            content: '•' !important;
            position: absolute !important;
            left: 0 !important;
            color: ${props.isDarkMode ? '#66B2FF' : '#0096FF'} !important;
          }
          .generating-pdf .job-content {
            width: 100% !important;
            max-width: 100% !important;
            overflow: visible !important;
            word-wrap: break-word !important;
          }
        `
        clonedDoc.head.appendChild(style)
      }
    })

    const imgData = canvas.toDataURL('image/png', 1.0)
    const pdf = new jsPDF({
      format: [1152, 1711],
      unit: 'px'
    })

    pdf.addImage(imgData, 'PNG', 0, 0, 1152, 1711)
    pdf.save('philip-hutchins-resume.pdf')

  } finally {
    // Clean up
    document.body.removeChild(clone)
  }
}
</script>

<style lang="scss" scoped>
.resume {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  margin-bottom: 1rem;

  &-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  &-left {
    flex: 1;
    text-align: left;

    h1 {
      margin-bottom: 0.25rem;
    }

    h2 {
      margin-bottom: 0.5rem;
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
  0%, 100% { opacity: 0; }
  50% { opacity: 0.7; }
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

.name-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.1rem;

  .actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}

.theme-toggle {
  margin-left: 1rem;
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

// Styles for PDF generation
:global(.generating-pdf) {
  background-color: var(--background-color) !important;
  color: var(--text-color) !important;
  width: 816px !important;
  padding: 40px !important;
  margin: 0 !important;
  box-sizing: border-box !important;
  font-family: Arial, sans-serif !important;

  * {
    visibility: visible !important;
    opacity: 1 !important;
    font-family: inherit !important;
  }

  .theme-toggle,
  .download-btn,
  .typing-effect {
    display: none !important;
  }

  .header {
    margin-bottom: 2rem !important;

    &-content {
      display: flex !important;
      justify-content: space-between !important;
      align-items: flex-start !important;
    }

    &-left {
      flex: 1 !important;
      width: 70% !important;

      h1 {
        font-size: 32px !important;
        line-height: 1.2 !important;
        margin-bottom: 0.1rem !important;
        white-space: nowrap !important;
      }

      h2 {
        font-size: 18px !important;
        line-height: 1.2 !important;
        margin-bottom: 0.75rem !important;
        white-space: nowrap !important;
        font-weight: 600 !important;
      }
    }
  }

  .profile-image {
    width: 120px !important;
    height: 120px !important;
    margin-left: 2rem !important;

    img {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
    }
  }

  .main-content {
    display: flex !important;
    gap: 2rem !important;
    flex-direction: row !important;
    width: 100% !important;
  }

  .left-column {
    flex: 1.5 !important;
    width: 60% !important;
  }

  .right-column {
    flex: 1 !important;
    width: 40% !important;
  }

  section {
    margin-bottom: 1.5rem !important;
    page-break-inside: avoid !important;

    h2 {
      font-size: 16px !important;
      padding-bottom: 0.05rem !important;
      margin-bottom: 0.5rem !important;
      border-bottom: 3px solid currentColor !important;
    }
  }

  .job-card,
  .job-content,
  .skills-list {
    max-height: none !important;
    overflow: visible !important;
    display: block !important;
  }

  p, li {
    font-size: 12px !important;
    line-height: 1.4 !important;
    margin-bottom: 0.5rem !important;
  }

  .contact-info {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 1rem !important;
    margin-top: 1rem !important;

    a {
      display: flex !important;
      align-items: center !important;
      gap: 0.5rem !important;
      font-size: 12px !important;
      white-space: nowrap !important;
    }

    svg {
      width: 12px !important;
      height: 12px !important;
    }
  }
}
</style>