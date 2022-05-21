<template>
  <span v-if="isLoading"> Loading </span>
  <div v-else-if="hasError">
    Error!
  </div>
  <div v-else>
    <n-space vertical>
      <RuleListItem
        v-for="rule in rulesList"
        :key="rule.name"
        :rule="rule"
      />
      <router-link
        class="new-rule"
        to="/rules/new"
      >
        <n-button type="primary">
          Add new rule
        </n-button>
      </router-link>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue"

import RuleListItem from "@/components/rule-list/RuleListItem.vue"
import { useFetch } from "@/composable/useFetch"
import { ValidationRule } from "@/types"

const rulesList = ref<ValidationRule[]>([])

const {
  get: getRulesList,
  hasError,
  isLoading,
} = useFetch<ValidationRule[]>("/rules")

onBeforeMount(async () => {
  isLoading.value = true
  try {
    const { data } = await getRulesList()
    rulesList.value = data
  } catch {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
})
</script>

<style lang="scss" scoped>
.new-rule {
  text-decoration: none;
}
</style>
