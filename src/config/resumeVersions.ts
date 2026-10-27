import type { ResumeVersion } from '../types/resume'
import { resumeContent } from './resumeContent'

export const resumeVersions: Record<string, ResumeVersion> = {
  default: {
    name: 'Default',
    theme: {
      primary: '#0096FF',
      secondary: '#333333',
      background: '#FFFFFF',
      text: '#000000',
    },
    oneLiners: [
      'Building mobile products, platforms, and AI tools',
      'Leading engineering teams and AI adoption',
      'Publishing iOS apps and building for Android',
      'Connecting data across 150+ databases',
      'Building reliable infrastructure for growing teams',
    ],
    sections: {
      summary: true,
      experience: true,
      projects: true,
      skills: true,
      strengths: false,
      education: true,
      advisory: true
    },
    content: resumeContent,
  },
}
