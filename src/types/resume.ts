// Theme configuration
export interface Theme {
  primary: string
  secondary: string
  background: string
  text: string
}

// Section visibility configuration
export interface Sections {
  summary: boolean
  experience: boolean
  projects: boolean
  skills: boolean
  strengths: boolean
  education: boolean
  advisory: boolean
}

// Strength card configuration
export interface Strength {
  title: string
  description: string
}

// Resume content configuration
export interface Content {
  profile: Profile
  summary: string
  experience: Experience[]
  projects: Project[]
  skills: SkillCategory[]
  strengths: Strength[]
  education: Education[]
  advisory: Advisory[]
}

// Resume version configuration
export interface ResumeVersion {
  name: string
  theme: Theme
  oneLiners: string[]
  sections: Sections
  content: Content
}

// Experience section configuration
export interface Experience {
  id: string
  title: string
  company: string
  companyDescription?: string
  location: string
  startDate: string
  endDate: string
  employmentType?: string
  note?: string
  description: string[]
  technologies?: string[]
  expandedByDefault?: boolean
}

// Skill configuration
export interface SkillCategory {
  name: string
  note?: string
  skills: string[]
}

export interface Profile {
  name: string
  title: string
  focus: string
  email: string
  phone: string
  phoneHref: string
  linkedin: string
  website: string
  location: string
  locationHref: string
  resumePdf: string
}

export interface Project {
  name: string
  kind: 'mobile' | 'web'
  platform: string
  description: string
  links: { label: string; url: string }[]
}

export interface Education {
  school: string
  studies: string
  dates: string
  note: string
}

// Advisory role configuration
export interface Advisory {
  company: string
  role: string
}
