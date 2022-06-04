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
    <n-space :size="32" vertical>
      <n-space vertical>
        <validation-list-item
          v-for="validation in validationList"
          :key="validation.validationId"
          :validation="validation"
        />
      </n-space>

      <router-link class="create-validation" to="/validations/create">
        <n-button type="primary"> Create new validation </n-button>
      </router-link>
    </n-space>
  </div>
</template>

<style scoped>
.create-validation {
  text-decoration: none;
}
</style>
