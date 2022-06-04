<template>
  <span v-if="isLoading"> Loading </span>
  <div v-else-if="hasError">Error!</div>
  <n-space v-else :size="32" vertical>
    <auto-complete-provider :secrets="secrets">
      <n-space vertical>
        <RuleListItem v-for="rule in rulesList" :key="rule.name" :rule="rule" />
      </n-space>
    </auto-complete-provider>

    <n-space>
      <router-link class="new-rule" to="/rules/new">
        <n-button type="primary"> Add new rule </n-button>
      </router-link>
      <n-button secondary type="primary" @click="showSecretsDialog">
        Secrets
      </n-button>
    </n-space>

    <Secrets :secrets="secrets" />
  </n-space>
</template>

<script setup lang="ts">
import { useNotification } from "naive-ui"
import { onBeforeMount, onBeforeUnmount, provide, ref } from "vue"
import { useRoute } from "vue-router"

import RuleListItem from "@/components/rule-list/RuleListItem.vue"
import Secrets from "@/components/rule-list/Secrets.vue"
import { useFetch } from "@/composable/useFetch"
import { eventBus, Events } from "@/event-bus"
import { ValidationRule } from "@/types"

const { params } = useRoute()
const {
  get: getRulesList,
  hasError,
  isLoading,
} = useFetch<ValidationRule[]>("/rules")
const { get: getSecretKeys } = useFetch<string[]>("/secrets/")

const notification = useNotification()
const { success, info } = notification

provide("notification", notification)

const rulesList = ref<ValidationRule[]>([])
const secrets = ref<string[]>([])

const showSecretsDialog = () => {
  eventBus.emit(Events.SHOW_SECRETS_DIALOG)
}

const fetchSecretKeys = async () => {
  const { data: secretKeys } = await getSecretKeys()
  secrets.value = secretKeys
}

onBeforeMount(async () => {
  eventBus.on(Events.REFETCH_SECRETS, async () => {
    isLoading.value = true
    await fetchSecretKeys()
    isLoading.value = false
  })

  isLoading.value = true
  try {
    const { data } = await getRulesList()

    rulesList.value = data
    await fetchSecretKeys()
  } catch {
    hasError.value = true
  } finally {
    isLoading.value = false
  }

  const { updateSuccess, createSuccess, deleteSuccess } = params

  if (updateSuccess) {
    success({
      title: "Rule updated",
      content: `Rule '${updateSuccess}' updated successfully`,
    })
  }

  if (createSuccess) {
    success({
      title: "Rule created",
      content: `Rule '${createSuccess}' created successfully`,
    })
  }

  if (deleteSuccess) {
    info({
      title: "Rule deleted",
      content: `Rule '${deleteSuccess}' deleted successfully`,
    })
  }
})

onBeforeUnmount(() => {
  eventBus.off(Events.REFETCH_SECRETS)
})
</script>

<style lang="scss" scoped>
.new-rule {
  text-decoration: none;
}
</style>
