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
        v-if="!conditions.length"
        class="info"
      >
        Please at least one condition, by which the rule should be evaluated!
      </span>
      <condition-card
        v-for="condition in conditions"
        :key="condition.id"
        v-model:value="condition.condition"
        :condition-id="condition.id"
        @delete="deleteCondition(condition.id)"
      />
    </n-space>
  </n-space>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity"
import { ref, watch } from "vue"

import { Condition } from "@/types"
import { createUuid } from "@/utils"

import ConditionCard from "./ConditionCard.vue"

const emit = defineEmits(["update:conditions", "update:boolean-condition"])
const props = defineProps<{
  conditions?: Condition[];
  booleanCondition?: "any" | "all";
}>()

const conditions = ref<{ condition?: Condition; id: string }[]>(
  (props.conditions || []).map((condition) => ({
    condition,
    id: createUuid(),
  }))
)

const booleanCondition = ref<"any" | "all" | null>(
  props.booleanCondition || null
)

const displayBooleanConditionInput = computed(
  () => conditions.value.length > 1
)

const booleanConditionOptions = [
  {
    value: "any",
    label: "ANY",
  },
  { value: "all", label: "ALL" },
]

const addNewCondition = () => {
  conditions.value = [
    ...conditions.value,
    { id: createUuid(), condition: undefined },
  ]
}

const deleteCondition = (conditionId: string) => {
  conditions.value = conditions.value.filter(({ id }) => id !== conditionId)
}

watch(conditions, () => emit("update:conditions", conditions.value))

watch(booleanCondition, () =>
  emit("update:boolean-condition", booleanCondition)
)
</script>

<style scoped></style>
