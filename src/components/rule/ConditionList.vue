<template>
  <n-space vertical>
    <n-space justify="space-between" align="center">
      <h3>Conditions</h3>
      <n-button secondary type="primary" size="small" @click="addNewCondition">
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
      <span v-if="!conditionIds.length" class="info">
        Please at least one condition, by which the rule should be evaluated!
      </span>
      <condition-card
        v-for="id in conditionIds"
        :key="id"
        v-model:value="conditions[id]"
        :condition-id="id"
        @delete="deleteCondition(id)"
      />
    </n-space>
  </n-space>
</template>

<script setup lang="ts">
import { NotificationApiInjection } from "naive-ui/es/notification/src/NotificationProvider"
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue"

import { eventBus, Events } from "@/event-bus"
import { Condition, MappedObject } from "@/types"
import { createMappedObject, createUuid } from "@/utils"

import ConditionCard from "./ConditionCard.vue"

const emit = defineEmits(["update:conditions", "update:boolean-condition"])
const props = defineProps<{
  conditions?: Condition[]
  booleanCondition?: "any" | "all"
}>()

const notification = inject<NotificationApiInjection>("notification")

const conditions = reactive<MappedObject<Condition>>(
  createMappedObject(props.conditions || [])
)

const booleanCondition = ref<"any" | "all" | null>(
  props.booleanCondition || null
)

const conditionIds = computed(() => Object.keys(conditions))

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

const addNewCondition = () => {
  conditions[createUuid()] = {
    path: "",
    type: null,
    operator: null,
    value: "",
  } as any as Condition
}

const deleteCondition = (conditionId: string) => {
  delete conditions[conditionId]
}

watch(conditions, () => emit("update:conditions", Object.values(conditions)))

watch(booleanCondition, () =>
  emit("update:boolean-condition", booleanCondition)
)

watch(displayBooleanConditionInput, (value, oldValue) => {
  if (value && !oldValue) {
    booleanCondition.value = null
  }
})

onMounted(() => {
  eventBus.on(Events.NO_CONDITION_DETECTED, () => {
    notification?.error({
      title: "No condition added",
      content: "Please add at least one condition!",
    })
  })

  eventBus.on(Events.NO_BOOLEAN_CONDITION, () => {
    notification?.error({
      title: "Please add a boolean condition",
      content: "Please choose either 'ANY' or 'ALL'",
    })
  })
})

onBeforeUnmount(() => {
  eventBus.off(Events.NO_CONDITION_DETECTED)
})
</script>

<style scoped></style>
