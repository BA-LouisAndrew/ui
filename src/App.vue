<script setup lang="ts">
import { themeOverrides } from "./theme"
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <router-view />
  </n-config-provider>
</template>

<style>
#app {
  padding: 32px;
  font-family: "Roboto Mono", monospace;
}
</style>
