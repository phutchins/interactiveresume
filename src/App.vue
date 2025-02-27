<script setup lang="ts">
import { ref } from 'vue'
import Resume from './components/Resume.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSun, faMoon)

const isDarkMode = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.body.classList.toggle('dark-mode')
}
</script>

<template>
  <div :class="{ 'dark-mode': isDarkMode }" class="app">
    <div class="resume-container">
      <div class="theme-toggle" @click="toggleDarkMode">
        <font-awesome-icon :icon="isDarkMode ? 'sun' : 'moon'" />
      </div>
      <Resume />
    </div>
  </div>
</template>

<style lang="scss">
:root {
  --primary-color: #0096FF;
  --secondary-color: #333333;
  --background-color: #FFFFFF;
  --text-color: #000000;
}

body {
  background-color: var(--background-color);
  transition: background-color 0.3s ease;
}

body.dark-mode,
.dark-mode {
  --primary-color: #66B2FF;
  --secondary-color: #CCCCCC;
  --background-color: #1A1A1A;
  --text-color: #FFFFFF;
}

html, body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  width: 100%;
}

.app {
  min-height: 100vh;
  width: 100%;
  background-color: var(--background-color);
  color: var(--text-color);
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 0;
  padding: 0;
}

.resume-container {
  position: relative;
  max-width: 1200px;
  width: 100%;
  padding: 2rem;
}

.theme-toggle {
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: var(--background-color);
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    transform: scale(1.1);
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  overflow-x: hidden;
}
</style>
