<template>
  <n-space class="key-value-input" vertical data-testid="key-value-input">
    <n-space
      v-for="id in keyValuePairIds"
      :key="id"
      vertical
      data-testid="key-value-field"
    >
      <n-input v-model:value="keyValuePairs[id].key" placeholder="Key" />
      <n-auto-complete
        v-model:value="keyValuePairs[id].value"
        :options="options"
        :get-show="showLabelFunction"
        :render-label="renderLabel"
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
    <n-button type="primary" secondary @click="addKeyValuePair"> Add </n-button>
  </n-space>
</template>

<script setup lang="ts">
import { TrashSharp } from "@vicons/ionicons5"
import { computed, reactive, watch } from "vue"

import { KeyValuePair, MappedObject } from "@/types"
import {
  createMappedObject,
  createUuid,
  getAutocompleteOptions,
  getShowLabel,
  renderLabel,
} from "@/utils"

const emit = defineEmits(["update:key-value-pairs"])
const props = defineProps<{ keyValuePairs?: KeyValuePair[] }>()

const keyValuePairs = reactive<MappedObject<KeyValuePair>>(
  createMappedObject(props.keyValuePairs || [])
)

const keyValuePairIds = computed(() => Object.keys(keyValuePairs))

const addKeyValuePair = () => {
  keyValuePairs[createUuid()] = {
    key: "",
    value: "",
  }
}

const options = getAutocompleteOptions("customer")
const showLabelFunction = getShowLabel("customer")

const deleteKeyValuePair = (id: string) => {
  delete keyValuePairs[id]
}

watch(keyValuePairs, (value) =>
  emit("update:key-value-pairs", Object.values(value))
)
</script>

<style scoped>
.key-value-input {
  width: 100%;
}
</style>
