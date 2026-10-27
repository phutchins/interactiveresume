import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { after, test } from 'node:test'
import { createServer } from 'vite'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createMemoryHistory, createRouter } from 'vue-router'

const server = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false },
  // Bundle both together to share one icon registry during server rendering.
  ssr: { noExternal: ['@fortawesome/vue-fontawesome', '@fortawesome/fontawesome-svg-core'] },
  appType: 'custom',
})
after(() => server.close())
const { default: App } = await server.ssrLoadModule('/src/App.vue')
const { FontAwesomeIcon } = await server.ssrLoadModule('@fortawesome/vue-fontawesome')
const { resumeVersions } = await server.ssrLoadModule('/src/config/resumeVersions.ts')
const defaultContent = resumeVersions.default.content

async function render(url = '/') {
  const router = createRouter({ history: createMemoryHistory(), routes: [{ path: '/', component: App }] })
  const app = createSSRApp(App)
  app.use(router)
  app.component('font-awesome-icon', FontAwesomeIcon)
  await router.push(url)
  await router.isReady()
  return renderToString(app)
}

test('default resume renders current work, portfolio, education, and the approved PDF', async () => {
  const html = await render()
  for (const text of ['Creative Glu', 'IPC - Interplanetary Consensus', 'DFM Data Corp., Inc.',
    'May 2026 - Present', 'May 2025 - April 2026', 'October 2023 - May 2025',
    'March 2020 - June 2020', 'outside business hours', 'Android | Unpublished',
    'Limited project experience', 'no degree.', 'MacroTracker by Reciplan', 'Paper Games Retro']) {
    assert.ok(html.includes(text), `Missing approved content: ${text}`)
  }
  assert.ok(!html.includes('STRENGTHS'))
  assert.ok(!html.includes('stealth startup'))
  assert.ok(!html.includes('Resume-2025.pdf'))
  const pdfPath = defaultContent.profile.resumePdf
  assert.ok(html.includes(`href="${pdfPath}"`))
  const pdf = await readFile(new URL(`../public${pdfPath}`, import.meta.url))
  assert.equal(pdf.subarray(0, 5).toString(), '%PDF-')
  for (const project of defaultContent.projects) {
    for (const link of project.links) assert.ok(html.includes(link.url), `Missing portfolio link: ${link.url}`)
  }
})

test('every section receives the selected version content instead of hardcoded defaults', async () => {
  resumeVersions.test = {
    ...resumeVersions.default,
    name: 'Test',
    sections: Object.fromEntries(Object.keys(resumeVersions.default.sections).map(key => [key, true])),
    content: {
      ...defaultContent,
      profile: { ...defaultContent.profile, name: 'Test Person', resumePdf: '/test.pdf' },
      summary: 'Version-specific summary',
      experience: [{ ...defaultContent.experience[0], id: 'custom', company: 'Custom Employer' }],
      projects: [
        { name: 'Custom Mobile', kind: 'mobile', platform: 'Test', description: 'Mobile description', links: [] },
        { name: 'Custom Web', kind: 'web', platform: 'Test', description: 'Web description', links: [] },
      ],
      skills: [{ name: 'Custom Category', skills: ['Custom Skill'] }],
      strengths: [{ title: 'Custom Strength', description: 'Strength description' }],
      education: [{ school: 'Custom School', studies: 'Coursework', dates: '2001-2002', note: 'No degree' }],
      advisory: [{ company: 'Custom Advisory', role: 'Advisor' }],
    },
  }
  const html = await render('/?version=test')
  for (const text of ['TEST PERSON', '/test.pdf', 'Version-specific summary', 'Custom Employer',
    'Custom Mobile', 'Custom Web', 'Custom Skill', 'Custom Strength', 'Custom School', 'Custom Advisory']) {
    assert.ok(html.includes(text), `Version content not rendered: ${text}`)
  }
  for (const text of ['Creative Glu', 'MacroTracker', 'Southern Polytechnic', 'Verady']) {
    assert.ok(!html.includes(text), `Default content leaked into another version: ${text}`)
  }
})

test('all version section visibility flags are respected', async () => {
  resumeVersions.hidden = {
    ...resumeVersions.test,
    name: 'Hidden',
    sections: Object.fromEntries(Object.keys(resumeVersions.default.sections).map(key => [key, false])),
  }
  const html = await render('/?version=hidden')
  assert.ok(html.includes('TEST PERSON'))
  for (const text of ['Version-specific summary', 'Custom Employer', 'Custom Mobile', 'Custom Web',
    'Custom Skill', 'Custom Strength', 'Custom School', 'Custom Advisory']) {
    assert.ok(!html.includes(text), `Hidden section still renders: ${text}`)
  }
})

test('unknown, prototype, and repeated version parameters fall back to the default', async () => {
  for (const query of ['missing', '__proto__', 'constructor', '', 'default&version=test']) {
    const html = await render(`/?version=${query}`)
    assert.ok(html.includes('PHILIP HUTCHINS'), `Failed fallback for ${query}`)
    assert.ok(html.includes('Creative Glu'), `Failed fallback content for ${query}`)
  }
})
