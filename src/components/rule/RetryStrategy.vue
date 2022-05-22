<template>
  <n-space
    vertical
    data-testid="retry-strategy-card"
  >
    <n-space
      justify="space-between"
      align="center"
    >
      <h3>Retry Strategy</h3>
      <n-button
        :type="buttonProps.type"
        size="small"
        secondary
        @click="handleButtonClick"
      >
        {{ buttonProps.text }}
      </n-button>
    </n-space>
    <n-card
      v-if="retryStrategyExists"
      vertical
    >
      <n-form
        ref="formRef"
        :model="formValues"
      >
        <n-grid
          x-gap="12"
          :cols="2"
        >
          <n-gi>
            <n-form-item
              label="Limit"
              path="limit"
            >
              <n-input-number
                v-model:value="formValues.limit"
                :min="1"
                :max="3"
                placeholder="Limit"
              />
            </n-form-item>
          </n-gi>

          <n-gi>
            <n-form-item
              label="Status Codes"
              path="statusCodes"
            >
              <n-select
                v-model:value="formValues.statusCodes"
                :options="statusCodeOptions"
                multiple
                filterable
              />
            </n-form-item>
          </n-gi>
        </n-grid>
      </n-form>
    </n-card>
    <span
      v-else
      class="info"
    >
      Adding a retry strategy is optional, but it can be useful to retry the request in case the external endpoint is not accessible.
    </span>
  </n-space>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity"
import { FormInst } from "naive-ui"
import { reactive, ref, watch } from "vue"

import { RetryStrategy } from "@/types"

import { statusCodeOptions } from "./utils"

const emit = defineEmits(["update:retry-strategy"])
const props = defineProps<{ retryStrategy?: RetryStrategy }>()

const retryStrategyExists = ref(!!props.retryStrategy)
const formRef = ref<FormInst>()

const formValues = reactive({
  limit: props.retryStrategy?.limit || 1,
  statusCodes: props.retryStrategy?.statusCodes || null,
})

const buttonProps = computed<{ text: string; type: "error" | "primary" }>(() =>
  retryStrategyExists.value
    ? {
      text: "Delete",
      type: "error",
    }
    : { text: "Add retry strategy", type: "primary" }
)

const handleButtonClick = computed(() =>
  retryStrategyExists.value ? removeRetryStrategy : addRetryStrategy
)

const removeRetryStrategy = () => {
  formValues.limit = 1
  formValues.statusCodes = null
  retryStrategyExists.value = false
}

const addRetryStrategy = () => {
  retryStrategyExists.value = true
}

watch(formValues, () => emit("update:retry-strategy", formValues))
</script>

<style scoped></style>
