<template>
  <span v-if="isLoading"> Loading </span>
  <div v-else-if="hasError">
    Error!
  </div>
  <div v-else>
    <RuleForm :rule="validationRule!" />
  </div> 
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue"
import { useRoute } from "vue-router"

import RuleForm from "@/components/Rule/RuleForm.vue"
import { useFetch } from "@/composable/useFetch"
import { ValidationRule } from "@/types"
const { params } = useRoute()
const { get: getValidationRule, hasError, isLoading } = useFetch<ValidationRule>("/rules/" + params.ruleName)

const validationRule = ref<ValidationRule | null>()

onBeforeMount(async () => {
  isLoading.value = true
  try {
    const { data } = await getValidationRule()
    validationRule.value = data
  } catch {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>

</style>