<template>
  <div>
    Rule
    {{ params.ruleName }}
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router"

const { params } = useRoute()
</script>

<style scoped>

</style>