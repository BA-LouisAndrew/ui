<template>
  <n-space
    vertical
    data-testid="key-value-input"
  >
    <n-space
      v-for="id in keyValuePairIds"
      :key="id"
      align="center"
      data-testid="key-value-field"
    >
      <n-input
        v-model:value="keyValuePairs[id].key"
        placeholder="Key"
      />
      <n-input
        v-model:value="keyValuePairs[id].value"
        placeholder="Value"
      />
      <n-button
        quaternary
        type="error"
        size="tiny"
        @click="deleteKeyValuePair(id)"
      >
        Delete
      </n-button>
    </n-space>
    <n-button
      type="primary"
      secondary
      @click="addKeyValuePair"
    >
      Add
    </n-button>
  </n-space>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from "vue"

import { createUuid } from "@/utils"

type KeyValuePair = {
  key: string;
  value: string;
};

const emit = defineEmits(["input"])
const props = defineProps<{ keyValuePairs?: KeyValuePair[] }>()

const keyValuePairs = reactive<{ [id: string]: KeyValuePair }>(
  (props.keyValuePairs || []).reduce(
    (a, b) => ({ ...a, [createUuid()]: b }),
    {}
  )
)

const keyValuePairIds = computed(() => Object.keys(keyValuePairs))

const addKeyValuePair = () => {
  keyValuePairs[createUuid()] = {
    key: "",
    value: "",
  }
}

const deleteKeyValuePair = (id: string) => {
  delete keyValuePairs[id]
}

watch(keyValuePairs, (value) => emit("input", value))
</script>

<style scoped></style>
