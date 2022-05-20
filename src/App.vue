<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue"
import { themeOverrides } from "./theme"
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
    <router-view />
  </n-config-provider>
</template>

<style>
#app {
  padding: 32px;
  font-family: "Roboto Mono", monospace;
}
</style>
