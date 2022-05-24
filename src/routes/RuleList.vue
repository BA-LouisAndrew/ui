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
import { useNotification } from "naive-ui"
import { onBeforeMount, provide, ref } from "vue"
import { useRoute } from "vue-router"

import RuleListItem from "@/components/rule-list/RuleListItem.vue"
import { useFetch } from "@/composable/useFetch"
import { ValidationRule } from "@/types"

const rulesList = ref<ValidationRule[]>([])

const { params } = useRoute()
const {
  get: getRulesList,
  hasError,
  isLoading,
} = useFetch<ValidationRule[]>("/rules")
const notification = useNotification()
const { success, info }  = notification

provide("notification", notification)

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

  const { updateSuccess, createSuccess, deleteSuccess } = params

  if (updateSuccess) {
    success({
      title: "Rule updated",
      content: `Rule '${updateSuccess}' updated successfully`
    })
  }

  if (createSuccess) {
    success({
      title: "Rule created",
      content: `Rule '${createSuccess}' created successfully`
    })
  }
  
  if (deleteSuccess) {
    info({
      title: "Rule deleted",
      content: `Rule '${deleteSuccess}' deleted successfully`
    })
  }
})
</script>

<style lang="scss" scoped>
.new-rule {
  text-decoration: none;
}
</style>
