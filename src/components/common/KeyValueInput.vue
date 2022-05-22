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
        secondary
        type="error"
        size="small"
        data-testid="delete-button"
        @click="deleteKeyValuePair(id)"
      >
        <template #icon>
          <n-icon>
            <trash-sharp />
          </n-icon>
        </template>
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
import { TrashSharp } from "@vicons/ionicons5"
import { computed, reactive, watch } from "vue"

import { KeyValuePair } from "@/types"
import { createUuid } from "@/utils"

const emit = defineEmits(["update:key-value-pairs"])
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

watch(keyValuePairs, (value) => emit("update:key-value-pairs", Object.values(value)))
</script>

<style scoped></style>
