<template>
  <router-link
    class="validation-list-item"
    :to="`/validations/${props.validation.validationId}`"
    data-testid="validation-list-item"
  >
    <n-card>
      <n-space align="center" justify="space-between">
        <n-space vertical>
          <n-text>
            {{ props.validation.validationId }}
          </n-text>
        </n-space>

        <n-tag
          size="medium"
          :type="isValidationRunning ? 'info' : 'success'"
          round
        >
          <template #avatar>
            <n-icon size="22">
              <sync-circle v-if="isValidationRunning" class="rotate" />
              <checkmark-circle v-else />
            </n-icon>
          </template>
          {{ isValidationRunning ? "Running" : "Done" }}
        </n-tag>
      </n-space>
    </n-card>
  </router-link>
</template>

<script setup lang="ts">
import {
  CheckmarkCircleOutline as CheckmarkCircle,
  Sync as SyncCircle,
} from "@vicons/ionicons5"
import { computed } from "vue"

import { Validation } from "@/types"
import { isValidationRunning as _isValidationRunning } from "@/utils"

const props = defineProps<{ validation: Validation }>()
const isValidationRunning = computed(() =>
  _isValidationRunning(props.validation)
)
</script>

<style lang="scss" scoped>
.validation-list-item {
  text-decoration: none;

  h3 {
    margin: 0;
  }

  .icon {
    display: grid;
    place-items: center;
  }
}
</style>
