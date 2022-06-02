<script setup lang="ts">
import {
  DocumentTextOutline,
  HomeOutline,
  SearchOutline,
} from "@vicons/ionicons5"
import { MenuOption, NIcon } from "naive-ui"
import { Component, h, ref, watch } from "vue"
import { RouterLink, useRoute } from "vue-router"
enum PathOptions {
  HOME = "home",
  RULES = "rules",
  VALIDATIONS = "validations",
}

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const route = useRoute()
const currentPath = ref("")
const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: "/",
        },
        { default: () => "Home" }
      ),
    icon: renderIcon(HomeOutline),
    key: PathOptions.HOME,
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: "/rules",
        },
        { default: () => "Rules" }
      ),
    icon: renderIcon(DocumentTextOutline),
    key: PathOptions.RULES,
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: "/validations",
        },
        { default: () => "Validations" }
      ),
    icon: renderIcon(SearchOutline),
    key: PathOptions.VALIDATIONS,
  },
]

watch(
  () => route.path,
  (value) => {
    if (value.includes("/rules")) {
      currentPath.value = PathOptions.RULES
      return
    }

    if (value.includes("/validations")) {
      currentPath.value = PathOptions.VALIDATIONS
      return
    }

    if (value === "/") {
      currentPath.value = PathOptions.HOME
    }
  },
  { immediate: true }
)
</script>

<template>
  <n-menu
    v-model:value="currentPath"
    class="header"
    :options="menuOptions"
    mode="horizontal"
  />
</template>

<style scoped>
.header {
  margin-bottom: 20px;
}
</style>
