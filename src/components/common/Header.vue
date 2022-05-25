<script setup lang="ts">
import { MenuOption } from "naive-ui"
import { h, ref, watch } from "vue"
import { RouterLink, useRoute } from "vue-router"

enum PathOptions {
 HOME = "home",
 RULES = "rules",
 VALIDATIONS = "validations"
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
    key: PathOptions.VALIDATIONS,
  },
]

watch(() => route.path, value => {
  if (value.includes("/rules")) {
    currentPath.value = PathOptions.RULES
    return
  }
  
  if (value.includes("/validations")) {
    currentPath.value= PathOptions.VALIDATIONS
    return
  }
  
  if (value === "/") {
    currentPath.value = PathOptions.HOME
  }
}, { immediate: true })
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
