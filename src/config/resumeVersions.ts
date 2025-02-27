import type { ResumeVersion } from '../types/resume'

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
      "Building scalable systems that bring order to chaos",
      "Transforming complex infrastructure into elegant solutions",
      "Leading through hands-on engineering excellence",
      "Architecting the future of decentralized technology",
      "Bringing innovation to enterprise infrastructure",
      "Scaling startups from concept to production",
      "Bridging the gap between vision and execution",
      "Turning technical chaos into operational harmony"
    ],
    sections: {
      summary: true,
      experience: true,
      skills: true,
      strengths: true,
      advisory: true
    },
    content: {
      summary: "Product-orientated Engineering and Technology Leader with more than 19 years of deep technical experience architecting, implementing and supporting complex infrastructure and web applications that scale for fast growing startups.",
      strengths: [
        {
          title: "Bringing Order to Chaos",
          description: "By joining a number of startups very early, I developed a love and skill for bringing an order to the chaos while increasing productivity and morale"
        },
        {
          title: "Hands-On Leader",
          description: "I have remained hands on to some extent in all of my roles or in my own time to stay ahead of technology and lead from experience and by example"
        },
        {
          title: "Scale and Extensibility",
          description: "I have gained an immense amount of experience in my previous roles by architecting and building applications for scale while maintaining a healthy level of tech debt in order to ship customer features fast but reliably"
        }
      ]
    }
  }
}