<script setup lang="ts">
import { onBeforeMount, ref } from "vue"

import ValidationListItem from "@/components/validation-list/ValidationListItem.vue"
import { useFetch } from "@/composable/useFetch"
import { Validation } from "@/types"
const {
  get: getValidationLists,
  hasError,
  isLoading,
} = useFetch<Validation[]>("/validate/list")
const validationList = ref<Validation[]>([])

onBeforeMount(async () => {
  isLoading.value = true
  try {
    const { data } = await getValidationLists()
    validationList.value = data
  } catch {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <span v-if="isLoading"> Loading </span>
  <div v-else-if="hasError">Error!</div>
  <div v-else>
    <n-space vertical>
      <validation-list-item
        v-for="validation in validationList"
        :key="validation.validationId"
        :validation="validation"
      />
    </n-space>
  </div>
</template>

<style scoped></style>
