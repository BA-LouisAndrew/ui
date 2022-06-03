<template>
  <n-card data-testid="condition-card">
    <n-form ref="formRef" :model="formValues" :rules="formRules">
      <n-grid x-gap="12" y-gap="12" :cols="2">
        <n-gi>
          <n-form-item label="Path" path="path">
            <n-auto-complete
              v-model:value="formValues.path"
              :options="options.path"
              :render-label="renderLabel"
              :get-show="getShowLabelFunctions.path"
              placeholder="Path"
            />
          </n-form-item>
        </n-gi>

        <n-gi>
          <n-form-item label="Type" path="type">
            <n-select
              v-model:value="formValues.type"
              :options="typeSelectOptions"
            />
          </n-form-item>
        </n-gi>

        <n-gi>
          <n-form-item label="Operator" path="operator">
            <n-select
              v-model:value="formValues.operator"
              :options="operatorSelectOptions"
            />
          </n-form-item>
        </n-gi>

        <n-gi>
          <n-form-item
            ref="valueFormRef"
            :rule="valueFormRule"
            label="Value"
            path="value"
          >
            <n-auto-complete
              v-model:value="formValues.value"
              :options="options.value"
              :render-label="renderLabel"
              :get-show="getShowLabelFunctions.value"
              placeholder="Value"
            />
          </n-form-item>
        </n-gi>

        <n-gi :span="2">
          <n-form-item label="Fail message" path="failMessage">
            <n-input
              v-model:value="formValues.failMessage"
              placeholder="Fail message"
            />
          </n-form-item>
        </n-gi>
      </n-grid>
      <n-space justify="end">
        <n-button secondary type="error" size="small" @click="emit('delete')">
          Delete
        </n-button>
      </n-space>
    </n-form>
  </n-card>
</template>

<script setup lang="ts">
import { FormInst, FormItemInst, FormItemRule } from "naive-ui"
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue"

import { eventBus, Events } from "@/event-bus"
import { Condition, ConditionType } from "@/types"
import {
  autocompleteOptions,
  getAutocompleteOptions,
  getShowLabel,
  renderLabel,
} from "@/utils"

import { getAvailableOperators } from "./utils"

type Props = {
  value?: Condition
  conditionId?: string
}

const props = withDefaults(defineProps<Props>(), {
  conditionId: "default",
  value: undefined,
})
const emit = defineEmits(["update:value", "delete"])

const formValues = reactive({
  path: props.value?.path || "",
  type: props.value?.type || null,
  operator: props.value?.operator || null,
  value: props.value ? `${props.value.value}` : "",
  failMessage: props.value?.failMessage || "",
})

const valueFormRule = computed<FormItemRule[]>(() => [
  {
    required: true,
    trigger: "blur",
    message: "Please add a value",
  },
  {
    validator: (_, value) => {
      if (value.startsWith("$.")) {
        return true
      }

      if (formValues.type === "number") {
        return !isNaN(parseFloat(value))
      }
      return true
    },
    message: "Please input a valid number",
    trigger: "blur",
  },
])

const operatorSelectOptions = computed(() =>
  getAvailableOperators(formValues.type as ConditionType)
)

const formRef = ref<FormInst>()
const valueFormRef = ref<FormItemInst>()
const getShowLabelFunctions = {
  path: getShowLabel("response"),
  value: getShowLabel("all"),
}

const options = {
  path: getAutocompleteOptions("response"),
  value: autocompleteOptions,
}

watch(
  () => formValues.type,
  () => {
    if (
      operatorSelectOptions.value.findIndex(
        (option) => option.value === formValues.operator
      ) === -1
    ) {
      formValues.operator = null
    }

    valueFormRef.value?.validate()
  }
)

watch(formValues, (value) => emit("update:value", value))

onMounted(() => {
  eventBus.on(Events.VALIDATE_CONDITION, () => {
    formRef.value?.validate()
  })
})

onBeforeUnmount(() => {
  eventBus.off(Events.VALIDATE_CONDITION)
})

const typeSelectOptions = [
  {
    label: "String",
    value: "string",
  },
  {
    label: "Number",
    value: "number",
  },
  {
    label: "List / Array",
    value: "array",
  },
  {
    label: "Boolean (true or false)",
    value: "boolean",
  },
]

const formRules: { [key: string]: FormItemRule } = {
  path: {
    required: true,
    trigger: "blur",
    message: "Please add a JSONPath path to the attribute",
  },
  type: {
    required: true,
    trigger: "blur",
    message: "Please add a type of the attribute",
  },
  operator: {
    required: true,
    trigger: "blur",
    message: "Please add an operator to evaluate the attribute",
  },
  failMessage: {
    required: true,
    trigger: "blur",
    message: "Please add a message to be displayed if the rule check failed",
  },
}
</script>

<style scoped></style>
