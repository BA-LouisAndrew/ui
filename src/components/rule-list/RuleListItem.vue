<template>
  <router-link
    class="rule-list-item"
    :to="`/rules/${props.rule.name}`"
    data-testid="rule-list-item"
  >
    <n-card>
      <n-space align="center" justify="space-between">
        <n-space vertical>
          <n-text>
            {{ props.rule.name }}
          </n-text>
        </n-space>

        <n-tag
          size="medium"
          :type="props.rule.skip ? 'error' : 'success'"
          round
        >
          <template #avatar>
            <n-icon size="22">
              <close-circle v-if="props.rule.skip" />
              <checkmark-circle v-else />
            </n-icon>
          </template>

          {{ props.rule.skip ? "Disabled" : "Enabled" }}
        </n-tag>
      </n-space>
    </n-card>
  </router-link>
</template>

<script setup lang="ts">
import {
  CheckmarkCircleOutline as CheckmarkCircle,
  CloseCircleOutline as CloseCircle,
} from "@vicons/ionicons5"

import { ValidationRule } from "@/types"

const props = defineProps<{ rule: ValidationRule }>()
</script>

<style lang="scss" scoped>
.rule-list-item {
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
