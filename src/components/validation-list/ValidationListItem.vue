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
          <n-text>
            Customer:
            <n-text code>
              {{ customerName }}
            </n-text>
          </n-text>
        </n-space>

        <n-space>
          <n-tag
            v-if="!isValidationRunning"
            size="medium"
            round
            :type="scoreTagType"
          >
            Score: {{ fraudScore }}
          </n-tag>
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

const customerName = computed(() => {
  const customerInfo = props.validation.additionalInfo.customerInformation
  return `${customerInfo.firstName} ${customerInfo.lastName}`
})

const scoreTagType = computed(() => {
  if (props.validation.fraudScore >= 0.4) {
    return "error"
  }

  if (props.validation.fraudScore >= 0.2) {
    return "warning"
  }

  if (props.validation.fraudScore >= 0.1) {
    return "info"
  }
  return "success"
})

const fraudScore = computed(() => props.validation.fraudScore.toPrecision(2))
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
