<script setup lang="ts">
import { AxiosError } from "axios"
import { useNotification } from "naive-ui"
import { onBeforeMount, provide, ref } from "vue"
import { useRouter } from "vue-router"

import RuleForm from "@/components/rule/RuleForm.vue"
import { useFetch } from "@/composable/useFetch"
import { BackendError, ValidationRule } from "@/types"

const { post: postNewRule, isLoading, hasError } = useFetch("/rules")
const { get: getSecretKeys } = useFetch<string[]>("/secrets/")

const { push } = useRouter()
const notification = useNotification()

const secrets = ref<string[]>([])
const loadingMsg = ref("")

provide("notification", notification)

const createRule = async (rule: ValidationRule) => {
  isLoading.value = true
  loadingMsg.value = "Creating rule"
  try {
    const { data } = await postNewRule<ValidationRule>(rule)
    if (data) {
      push(`/rules?createSuccess=${rule.name}`)
    }
  } catch (e) {
    // TODO: create `useErrorHandler`
    handleError(e)
  } finally {
    isLoading.value = false
  }
}

const handleError = (e: unknown) => {
  const err = e as AxiosError<BackendError>
  const response = err.response?.data
  notification.error({
    title: response?.message || "Something went wrong",
    content: response?.details || "",
  })
}

onBeforeMount(async () => {
  isLoading.value = true
  loadingMsg.value = "Fetching secrets"
  try {
    const { data: secretKeys } = await getSecretKeys()
    secrets.value = secretKeys
  } catch (e) {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div v-if="hasError">Error</div>
  <n-spin v-else :show="isLoading" size="large" stroke="#fff">
    <auto-complete-provider :secrets="secrets">
      <RuleForm v-if="!isLoading" @create="createRule" />
    </auto-complete-provider>
    <template #description>
      <h3 style="color: white">{{ loadingMsg }}</h3>
    </template>
  </n-spin>
</template>

<style scoped></style>
