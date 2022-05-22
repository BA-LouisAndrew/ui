<template>
  <n-space
    class="rule-form"
    justify="space-between"
    vertical
    data-testid="rule-form"
  >
    <n-form
      ref="formRef"
      :model="formValues"
    >
      <h2>
        {{ CONSTANTS.title }}
      </h2>
      <n-grid
        :cols="3"
        :x-gap="120"
        :y-gap="32"
      >
        <n-gi :span="1">
          <n-space vertical>
            <n-form-item
              label="Name"
              path="name"
            >
              <n-input
                v-model:value="formValues.name"
                :disabled="isEditingRule"
                placeholder="Name"
              />
            </n-form-item>

            <n-space :size="[32, 0]">
              <n-form-item
                label="Enabled"
                path="enabled"
              >
                <n-switch v-model:value="formValues.enabled" />
              </n-form-item>

              <n-form-item
                label="Priority"
                path="priority"
                :label-width="64"
              >
                <n-input-number
                  v-model:value="formValues.priority"
                  class="priority-input"
                  :min="0"
                  :max="99"
                  placeholder="Priority"
                />
              </n-form-item>
            </n-space>

            <n-form-item
              label="Method"
              path="method"
            >
              <n-select
                v-model:value="formValues.method"
                :options="httpMethodOptions"
              />
            </n-form-item>

            <n-form-item
              label="Fail score"
              path="failScore"
            >
              <n-input-number
                v-model:value="formValues.failScore"
                :min="0"
                :max="1"
                :step="0.1"
                placeholder="Fail score"
              />
            </n-form-item>

            <n-form-item label="Request URL parameter">
              <key-value-input :key-value-pairs="requestUrlParameter" />
            </n-form-item>

            <n-form-item label="Request body">
              <key-value-input :key-value-pairs="requestBody" />
            </n-form-item>
          </n-space>
        </n-gi>

        <n-gi :span="2">
          <n-space
            :space="[0, 64]"
            vertical
          >
            <condition-list
              ref="conditionListRef"
              :conditions="conditionProps.conditions"
              :boolean-condition-value="conditionProps.booleanConditionValue"
            />
            
            <retry-strategy :retry-strategy="props.rule?.retryStrategy" />
          </n-space>
        </n-gi>
      </n-grid>
    </n-form>
    <n-space justify="space-between">
      <n-button
        v-if="isEditingRule"
        primary
        type="error"
        @click="deleteRule"
      >
        Delete rule
      </n-button>
      <n-button
        type="primary"
        @click="CONSTANTS.action"
      >
        {{ CONSTANTS.buttonText }}
      </n-button>
    </n-space>
  </n-space>
</template>

<script setup lang="ts">
import { FormInst } from "naive-ui"
import { reactive, ref } from "vue"

import KeyValueInput from "@/components/common/KeyValueInput.vue"
import { ValidationRule } from "@/types"

import ConditionList from "./ConditionList.vue"
import RetryStrategy from "./RetryStrategy.vue"
import {
  genericObjectToKeyValuePairs,
  getConditionsProps,
  getFormValuesFromValidationRule,
  httpMethodOptions,
} from "./utils"

const props = defineProps<{ rule?: ValidationRule }>()
const emit = defineEmits(["create", "update", "delete"])

const formRef = ref<FormInst>()
const conditionListRef = ref<typeof ConditionList>()

const formValues = reactive(getFormValuesFromValidationRule(props.rule))
const isEditingRule = !!props.rule
const requestUrlParameter = genericObjectToKeyValuePairs(
  props.rule?.requestUrlParameter || {}
)
const requestBody = genericObjectToKeyValuePairs(props.rule?.requestBody || {})

const conditionProps = getConditionsProps(props.rule)

const createRule = () => {
  //
}
const updateRule = () => {
  
  emit("update")
}
const deleteRule = () => {
  //
}

const CONSTANTS = isEditingRule
  ? {
    title: `Editing ${props.rule.name}`,
    buttonText: "Save changes",
    action: updateRule,
  }
  : {
    title: "Create a new rule",
    buttonText: "Create rule",
    action: createRule,
  }
</script>

<style lang="scss" scoped>
.rule-form {
  min-height: calc(100vh - 64px);
}

.priority-input {
  width: 86px;
}
</style>
