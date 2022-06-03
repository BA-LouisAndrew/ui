<template>
  <span v-if="isLoading"> Loading </span>
  <div v-else-if="hasError">Error!</div>
  <div v-else>
    <n-spin :show="isActionLoading" size="large" stroke="#fff">
      <RuleForm
        :rule="validationRule!"
        @update="updateRule"
        @delete="deleteRule"
      />
      <template #description>
        <h3 style="color: white">
          {{ actionDescription }}
        </h3>
      </template>
    </n-spin>
  </div>
</template>

<script setup lang="ts">
import { AxiosError } from "axios"
import { useNotification } from "naive-ui"
import { onBeforeMount, provide, ref } from "vue"
import { useRoute, useRouter } from "vue-router"

import RuleForm from "@/components/rule/RuleForm.vue"
import { useFetch } from "@/composable/useFetch"
import { BackendError, ValidationRule } from "@/types"

const { params } = useRoute()
const { push } = useRouter()
const notification = useNotification()
const {
  get: getValidationRule,
  hasError,
  isLoading,
  put: putUpdateRule,
  delete: deleteRuleMutation,
} = useFetch<ValidationRule>("/rules/" + params.ruleName)

provide("notification", notification)
const { error } = notification

const validationRule = ref<ValidationRule | null>()
const isActionLoading = ref(false)
const actionDescription = ref("")

const updateRule = async (rule: ValidationRule) => {
  isActionLoading.value = true
  actionDescription.value = "Updating rule"
  try {
    const { name: _, ...rest } = rule
    const { data } = await putUpdateRule<Omit<ValidationRule, "name">>(rest)
    if (data) {
      push(`/rules?updateSuccess=${rule.name}`)
    }
  } catch (e) {
    // TODO: create `useErrorHandler`
    handleError(e)
  } finally {
    isActionLoading.value = false
    actionDescription.value = ""
  }
}

const deleteRule = async () => {
  isActionLoading.value = true
  actionDescription.value = "Deleting rule"
  try {
    await deleteRuleMutation()
    push(`/rules?deleteSuccess=${validationRule.value?.name}`)
  } catch (e) {
    // TODO: create `useErrorHandler`
    handleError(e)
  } finally {
    isActionLoading.value = false
    actionDescription.value = ""
  }
}

const handleError = (e: unknown) => {
  const err = e as AxiosError<BackendError>
  const response = err.response?.data
  error({
    title: response?.message || "Something went wrong",
    content: response?.details || "",
  })
}

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

<style scoped></style>
