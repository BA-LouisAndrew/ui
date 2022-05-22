<template>
  <n-space vertical>
    <n-space
      justify="space-between"
      align="center"
    >
      <h3>Conditions</h3>
      <n-button
        secondary
        type="primary"
        size="small"
        @click="addNewCondition"
      >
        Add condition
      </n-button>
    </n-space>

    <n-space
      v-if="displayBooleanConditionInput"
      justify="end"
      data-testid="boolean-condition-type"
    >
      <n-radio-group v-model:value="booleanCondition">
        <n-radio-button
          v-for="option in booleanConditionOptions"
          :key="option.value"
          :value="option.value"
          :label="option.label"
          size="small"
        />
      </n-radio-group>
    </n-space>

    <n-space vertical>
      <span
        v-if="!conditionIds.length"
        class="info"
      >
        Please at least one condition, by which the rule should be
        evaluated!
      </span>
      <condition-card
        v-for="conditionId in conditionIds"
        :key="conditionId"
        :default-values="getDefaultCondition(conditionId)"
        @delete="deleteCondition(conditionId)"
      />
    </n-space>
  </n-space>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity"
import { ref } from "vue"

import { Condition } from "@/types"
import { createUuid } from "@/utils"

import ConditionCard from "./ConditionCard.vue"

const props = defineProps<{
  conditions?: Condition[];
  booleanConditionValue?: "any" | "all";
}>()
const defaultConditions = (props.conditions || []).map((condition) => ({
  ...condition,
  id: createUuid(),
}))

const conditionIds = ref<string[]>(defaultConditions.map(({ id }) => id))
const booleanCondition = ref<"any" | "all" | null>(
  props.booleanConditionValue || null
)

const displayBooleanConditionInput = computed(
  () => conditionIds.value.length > 1
)

const booleanConditionOptions = [
  {
    value: "any",
    label: "ANY",
  },
  { value: "all", label: "ALL" },
]

const addNewCondition = () =>
  (conditionIds.value = [...conditionIds.value, createUuid()])

const deleteCondition = (conditionId: string) =>
  (conditionIds.value = conditionIds.value.filter((id) => id !== conditionId))

const getDefaultCondition = (conditionId: string) =>
  defaultConditions.find(({ id }) => id === conditionId)

const getConditions = () => {
  // 
}
</script>

<style scoped></style>
