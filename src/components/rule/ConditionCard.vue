<template>
  <n-card data-testid="condition-card">
    <n-form
      ref="formRef"
      :model="formValues"
      :rules="formRules"
    >
      <n-grid
        x-gap="12"
        y-gap="12"
        :cols="2"
      >
        <n-gi>
          <n-form-item
            label="Path"
            path="path"
          >
            <n-input
              v-model:value="formValues.path"
              placeholder="Path"
            />
          </n-form-item>
        </n-gi>

        <n-gi>
          <n-form-item
            label="Type"
            path="type"
          >
            <n-select
              v-model:value="formValues.type"
              :options="typeSelectOptions"
            />
          </n-form-item>
        </n-gi>

        <n-gi>
          <n-form-item
            label="Operator"
            path="operator"
          >
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
            <n-input
              v-model:value="formValues.value"
              placeholder="Value"
            />
          </n-form-item>
        </n-gi>
      </n-grid>
      <n-space justify="end">
        <n-button
          secondary
          type="error"
          size="small"
          @click="emit('delete')"
        >
          Delete
          <template #icon>
            <n-icon>
              <trash-bin />
            </n-icon>
          </template>
        </n-button>
      </n-space>
    </n-form>
  </n-card>
</template>

<script setup lang="ts">
import { TrashBin } from "@vicons/ionicons5"
import { FormInst, FormItemInst, FormItemRule } from "naive-ui"
import { computed, reactive, ref, watch } from "vue"

import { Condition, ConditionType } from "@/types"

import { getAvailableOperators } from "./getAvailableOperator"

type Props = {
  defaultValues?: Condition;
  conditionId?: number;
};

const props = withDefaults(defineProps<Props>(), {
  conditionId: 0,
  defaultValues: undefined
})
const emit = defineEmits(["input", "delete"])

const formValues = reactive({
  path: props.defaultValues?.path || "",
  type: props.defaultValues?.type || null,
  operator: props.defaultValues?.operator || null,
  value: props.defaultValues ? `${props.defaultValues.value}` : "",
})

const valueFormRule = computed<FormItemRule[]>(() => [
  {
    required: true,
    trigger: "blur",
    message: "Please add a value",
  },
  {
    validator: (_, value) => {
      if (formValues.type === "number") {
        return !isNaN(parseInt(value, 10))
      }
      return true
    },
    message: "Please input a valid number",
  },
])

const operatorSelectOptions = computed(() =>
  getAvailableOperators(formValues.type as ConditionType)
)

const formRef = ref<FormInst>()
const valueFormRef = ref<FormItemInst>()

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

watch(formValues, (value) => emit("input", value))

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
}
</script>

<style scoped></style>
