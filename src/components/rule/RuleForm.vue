<template>
  <n-space
    class="rule-form"
    justify="space-between"
    vertical
    data-testid="rule-form"
  >
    <n-space vertical>
      <h2>
        {{ isEditingRule ? "Editing " : "Create a new rule" }}
        <n-text v-if="isEditingRule" code>
          {{ rule!.name }}
        </n-text>
      </h2>
      <n-grid :cols="3" :x-gap="120" :y-gap="32">
        <n-gi :span="1">
          <n-form ref="formRef" :model="formValues" :rules="formRules">
            <n-space vertical>
              <n-form-item label="Name" path="name">
                <n-input
                  v-model:value="formValues.name"
                  :disabled="isEditingRule"
                  placeholder="Name"
                />
              </n-form-item>

              <n-space :size="[32, 0]">
                <n-form-item label="Enabled" path="enabled">
                  <n-switch v-model:value="formValues.enabled" />
                </n-form-item>

                <n-form-item label="Priority" path="priority" :label-width="64">
                  <n-input-number
                    v-model:value="formValues.priority"
                    class="priority-input"
                    :min="0"
                    :max="99"
                    placeholder="Priority"
                  />
                </n-form-item>
              </n-space>

              <n-form-item label="Endpoint" path="endpoint">
                <n-input v-model:value="formValues.endpoint" />
              </n-form-item>

              <n-form-item label="Method" path="method">
                <n-select
                  v-model:value="formValues.method"
                  :options="httpMethodOptions"
                />
              </n-form-item>

              <n-form-item label="Fail score" path="failScore">
                <n-input-number
                  v-model:value="formValues.failScore"
                  :min="0"
                  :max="1"
                  :step="0.1"
                  placeholder="Fail score"
                />
              </n-form-item>

              <n-form-item label="Request URL parameter">
                <key-value-input
                  v-model:key-value-pairs="requestUrlParameter"
                />
              </n-form-item>

              <n-form-item label="Request body">
                <key-value-input v-model:key-value-pairs="requestBody" />
              </n-form-item>

              <n-form-item label="Request header">
                <key-value-input v-model:key-value-pairs="requestHeader" />
              </n-form-item>
            </n-space>
          </n-form>
        </n-gi>

        <n-gi :span="2">
          <n-space :space="[0, 64]" vertical>
            <condition-list
              v-model:conditions="condition.conditions"
              v-model:boolean-condition="condition.booleanConditionValue"
            />

            <retry-strategy v-model:retry-strategy="retryStrategy" />
          </n-space>
        </n-gi>
      </n-grid>
    </n-space>

    <n-space class="mt-32" justify="space-between">
      <n-popconfirm
        v-if="isEditingRule"
        :positive-button-props="{ type: 'error' }"
        positive-text="Yes"
        negative-text="No"
        @positive-click="deleteRule"
      >
        <template #icon>
          <n-icon color="red">
            <alert-circle />
          </n-icon>
        </template>
        <template #trigger>
          <n-button primary type="error"> Delete rule </n-button>
        </template>
        Are you sure you want to delete this rule?
      </n-popconfirm>

      <span v-else />
      <n-button type="primary" @click="CONSTANTS.action">
        {{ CONSTANTS.buttonText }}
      </n-button>
    </n-space>
  </n-space>
</template>

<script setup lang="ts">
import { AlertCircle } from "@vicons/ionicons5"
import { FormInst, FormItemRule } from "naive-ui"
import { reactive, ref } from "vue"

import KeyValueInput from "@/components/common/KeyValueInput.vue"
import { HTTPMethod, ValidationRule } from "@/types"

import ConditionList from "./ConditionList.vue"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import RetryStrategy from "./RetryStrategy.vue"
import {
  genericObjectToKeyValuePairs,
  getConditionFromProps,
  getConditionsProps,
  getFormValuesFromValidationRule,
  httpMethodOptions,
  keyValuePairsToGenericObject,
  validateCondition,
  validateRetryStrategy,
} from "./utils"

const props = defineProps<{ rule?: ValidationRule }>()
const emit = defineEmits(["create", "update", "delete"])

const formRef = ref<FormInst>()
const isEditingRule = !!props.rule

const formValues = reactive(getFormValuesFromValidationRule(props.rule))
const requestUrlParameter = ref(
  genericObjectToKeyValuePairs(props.rule?.requestUrlParameter || {})
)
const requestBody = ref(
  genericObjectToKeyValuePairs(props.rule?.requestBody || {})
)
const requestHeader = ref(
  genericObjectToKeyValuePairs(props.rule?.requestHeader || {})
)

const condition = reactive(getConditionsProps(props.rule))
const retryStrategy = ref(props.rule?.retryStrategy || undefined)

const createRule = async () => {
  const value = getRuleValue()
  const isValid = await isFormValid(value)
  if (isValid) {
    emit("create", value)
  }
}

const updateRule = async () => {
  const value = getRuleValue()
  const isValid = await isFormValid(value)
  if (isValid) {
    emit("update", value)
  }
}

const deleteRule = () => {
  // Validation
  emit("delete")
}

const isFormValid = async (value: ValidationRule) =>
  new Promise((resolve) => {
    formRef.value?.validate((errors) => {
      if (!errors) {
        const isConditionValid = validateCondition(value.condition)
        const isRetryStrategyValid = validateRetryStrategy(value.retryStrategy)
        return resolve(isConditionValid && isRetryStrategyValid)
      }

      return resolve(false)
    })
  })

const getRuleValue = (): ValidationRule => {
  const { enabled, method, ...rest } = formValues

  return {
    ...rest,
    method: method as HTTPMethod,
    skip: !enabled,

    condition: getConditionFromProps(
      condition.conditions || [],
      condition.booleanConditionValue
    ),
    requestBody: keyValuePairsToGenericObject(requestBody.value),
    requestUrlParameter: keyValuePairsToGenericObject(
      requestUrlParameter.value
    ),
    requestHeader: keyValuePairsToGenericObject(requestHeader.value),
    retryStrategy: retryStrategy.value,
  }
}

const CONSTANTS = {
  buttonText: isEditingRule ? "Save changes" : "Create rule",
  action: isEditingRule ? updateRule : createRule,
}

const formRules: { [key: string]: FormItemRule } = {
  name: {
    required: true,
    trigger: "blur",
    message: "Please add a unique name for this rule",
  },
  endpoint: {
    required: true,
    trigger: "blur",
    message:
      "Please an external endpoint, with whose response the rule should be evaluated",
  },
  method: {
    required: true,
    trigger: "blur",
    message:
      "Please add an HTTP method, which will be used to fire an HTTP request to th external endpoint",
  },
  failScore: {
    required: true,
    trigger: "blur",
    message:
      "Please add score to be added to the fraud score if the rule failed",
    type: "number",
  },
}
</script>

<style lang="scss" scoped>
.priority-input {
  width: 86px;
}
</style>
