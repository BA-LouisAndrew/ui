<template>
  <n-space
    vertical
    data-testid="rule-form"
  >
    <h2>
      {{ CONSTANTS.title }}
    </h2>
    <n-form
      ref="formRef"
      :model="formValues"
    >
      <n-grid :cols="3">
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

            <n-space>
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
          </n-space>
        </n-gi>
      </n-grid>
    </n-form>
    <n-space justify="space-between">
      <n-button
        v-if="isEditingRule"
        secondary
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

import { ValidationRule } from "@/types"

import { getFormValuesFromValidationRule } from "./utils"

const props = defineProps<{ rule?: ValidationRule }>()
const emit = defineEmits(["create", "update", "delete"])

const formRef = ref<FormInst>()

const formValues = reactive(getFormValuesFromValidationRule(props.rule))
const isEditingRule = !!props.rule

const createRule = () => {
  //
}
const updateRule = () => {
  // TODO
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
.priority-input {
  width: 86px;
}
</style>
