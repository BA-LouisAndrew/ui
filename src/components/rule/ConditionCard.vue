<template>
  <n-card data-testid="condition-card">
    <n-form ref="formRef" :model="formValues" :rules="formRules">
      <n-grid x-gap="12" y-gap="12" :cols="2">
        <n-gi>
          <n-form-item label="Path" path="path">
            <template #label>
              <n-tooltip trigger="hover">
                <template #trigger>
                  <label> Path </label>
                </template>
                Defines a JSONPath expression to access information available of
                the current validation scope
              </n-tooltip>
            </template>
            <n-auto-complete
              v-model:value="formValues.path"
              :options="options.path"
              :render-label="renderLabel"
              :get-show="getShowLabel"
              placeholder="Path"
            />
          </n-form-item>
        </n-gi>

        <n-gi>
          <n-form-item label="Type" path="type">
            <template #label>
              <n-tooltip trigger="hover">
                <template #trigger>
                  <label> Type </label>
                </template>
                Determines the data type of the attribute accessed by the path
                attribute
              </n-tooltip>
            </template>
            <n-select
              v-model:value="formValues.type"
              :options="typeSelectOptions"
            />
          </n-form-item>
        </n-gi>

        <n-gi>
          <n-form-item label="Operator" path="operator">
            <template #label>
              <n-tooltip trigger="hover">
                <template #trigger>
                  <label> Operator </label>
                </template>
                Refers to a name of operator to be used to evaluate the
                condition, by comparing the property accessed by "path"
                attribute with the value of the "value" attribute
              </n-tooltip>
            </template>
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
            <template #label>
              <n-tooltip trigger="hover">
                <template #trigger>
                  <label> Value </label>
                </template>
                Refers to the expected value of the property accessed by the
                path attribute, compared using the operator attribute
              </n-tooltip>
            </template>
            <n-auto-complete
              v-model:value="formValues.value"
              :options="options.value"
              :render-label="renderLabel"
              :get-show="getShowLabel"
              placeholder="Value"
            />
          </n-form-item>
        </n-gi>

        <n-gi :span="2">
          <n-form-item label="Fail message" path="failMessage">
            <template #label>
              <n-tooltip trigger="hover">
                <template #trigger>
                  <label> Fail message </label>
                </template>
                Refers to a message that is going to be appended to the
                validation result’s messages attribute after a validation is
                completed, if the rule evaluation failed
              </n-tooltip>
            </template>
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

import { useAutocomplete } from "@/composable/useAutoComplete"
import { eventBus, Events } from "@/event-bus"
import { Condition, ConditionType } from "@/types"

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

const { getAutocompleteOptions, getShowLabel, renderLabel } = useAutocomplete()

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

const options = {
  path: getAutocompleteOptions("response"),
  value: getAutocompleteOptions("all"),
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
    message: "Please add a JSONPath expression to the attribute",
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
