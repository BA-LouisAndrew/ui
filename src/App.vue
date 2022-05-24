<script setup lang="ts">
import { useNotification } from "naive-ui"
import { provide } from "vue"

import { themeOverrides } from "./theme"

</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-notification-provider>
      <router-view />
    </n-notification-provider>
  </n-config-provider>
</template>

<style>
#app {
  padding: 32px 128px;
  font-family: "Roboto Mono", monospace;
}

.info {
  color: #5c5c5c;
  font-style: italic;
  font-size: 0.8rem;
}
</style>
