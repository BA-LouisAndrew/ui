<template>
  <n-spin :show="isLoading" size="large" stroke="#000">
    <RuleForm @create="createRule" />
    <template #description>
      <h3 style="color: black">Creating rule</h3>
    </template>
  </n-spin>
</template>

<script setup lang="ts">
import { AxiosError } from "axios"
import { useNotification } from "naive-ui"
import { provide, ref } from "vue"
import { useRouter } from "vue-router"

import RuleForm from "@/components/rule/RuleForm.vue"
import { useFetch } from "@/composable/useFetch"
import { BackendError, ValidationRule } from "@/types"

const { post: postNewRule } = useFetch("/rules")
const { push } = useRouter()
const notification = useNotification()
const isLoading = ref(false)

provide("notification", notification)

const createRule = async (rule: ValidationRule) => {
  isLoading.value = true
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
</script>

<style scoped></style>
