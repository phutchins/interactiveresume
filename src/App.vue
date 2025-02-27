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
      <div class="header-container">
        <h1>PHILIP HUTCHINS</h1>
        <div class="theme-toggle" @click="toggleDarkMode" :class="{ 'active': isDarkMode }">
          <div class="toggle-dot"></div>
        </div>
      </div>
      <Resume />
    </div>
  </div>
</template>

<style lang="scss">
:root {
  --primary-color: #0096FF;
  --primary-color-rgb: 0, 150, 255;
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
  --primary-color-rgb: 102, 178, 255;
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

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h1 {
    margin: 0;
  }
}

.theme-toggle {
  position: relative;
  width: 3.5rem;
  height: 2rem;
  background-color: #4B9CFF;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.25rem;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    right: 0.5rem;
    top: 50%;
    width: 0.5rem;
    height: 0.5rem;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    transform: translateY(-50%);
    transition: all 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    right: 0.75rem;
    top: 35%;
    width: 0.3rem;
    height: 0.3rem;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  &.active {
    background-color: #1e293b;

    &::before {
      right: unset;
      left: 0.4rem;
      width: 0.45rem;
      height: 0.45rem;
      background-color: white;
      clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    }

    &::after {
      right: unset;
      left: 0.8rem;
      top: 60%;
      width: 0.35rem;
      height: 0.35rem;
      background-color: white;
      clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    }
  }

  .toggle-dot {
    position: absolute;
    left: 0.25rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.25rem;
    height: 1.25rem;
    background-color: white;
    border-radius: 50%;
    transition: all 0.3s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  &.active .toggle-dot {
    transform: translate(1.75rem, -50%);
    background-color: white;

    &::before {
      content: '';
      position: absolute;
      top: -10%;
      left: 25%;
      width: 85%;
      height: 85%;
      border-radius: 50%;
      background-color: #1e293b;
      transform: scale(1);
    }
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
