<script setup lang="ts">
import { darkTheme } from "naive-ui"

import Header from "./components/common/Header.vue"
import { themeOverrides } from "./theme"
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-notification-provider>
      <n-space vertical>
        <Header />
        <router-view />
      </n-space>
    </n-notification-provider>
  </n-config-provider>
</template>

<style>
body {
  /* background-color: #222; */
  /* color: #fff; */
  font-family: "Montserrat", sans-serif;
}
#app {
  padding: 32px 128px;
}

.mt-32 {
  margin-top: 32px !important;
}

.info {
  color: #ababab;
  font-style: italic;
  font-size: 0.8rem;
}

.rotate {
  animation-name: rotation-animation;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
}

@keyframes rotation-animation {
  0% {
    transform: rotate(0deg);
  }

  10% {
    transform: rotate(36deg);
  }

  20% {
    transform: rotate(72deg);
  }

  30% {
    transform: rotate(108deg);
  }

  40% {
    transform: rotate(144deg);
  }

  50% {
    transform: rotate(180deg);
  }

  60% {
    transform: rotate(216deg);
  }

  70% {
    transform: rotate(252deg);
  }

  80% {
    transform: rotate(288deg);
  }

  90% {
    transform: rotate(324deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
