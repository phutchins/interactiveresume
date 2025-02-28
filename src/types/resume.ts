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
  skills: boolean
  strengths: boolean
  advisory: boolean
}

// Strength card configuration
export interface Strength {
  title: string
  description: string
}

// Resume content configuration
export interface Content {
  summary: string
  strengths: Strength[]
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
  title: string
  company: string
  companyDescription: string
  location: string
  startDate: string
  endDate: string
  description: string[]
  technologies?: string[]
}

// Skill configuration
export interface Skill {
  name: string
  category: string
  level: number
}

// Advisory role configuration
export interface Advisory {
  company: string
  role: string
}