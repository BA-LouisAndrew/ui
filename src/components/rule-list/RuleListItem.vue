<template>
  <router-link
    class="rule-list-item"
    :to="`/rules/${props.rule.name}`"
    data-testid="rule-list-item"
  >
    <n-card>
      <n-space
        align="center"
        justify="space-between"
      >
        <n-space vertical>
          <h3>
            {{ props.rule.name }}
          </h3>
          <n-code :code="props.rule.endpoint" />
        </n-space>

        <n-space align="center">
          <template v-if="props.rule.skip">
            <n-icon-wrapper
              class="icon"
              color="transparent"
              icon-color="#E57272FF"
            >
              <n-icon size="24">
                <close-circle />
              </n-icon>
            </n-icon-wrapper>
            <div>Disabled</div>
          </template>

          <template v-else>
            <n-icon-wrapper
              class="icon"
              color="transparent"
              icon-color="#1D9C48"
            >
              <n-icon size="24">
                <checkmark-circle />
              </n-icon>
            </n-icon-wrapper>
            <div>Enabled</div>
          </template>
        </n-space>
      </n-space>
    </n-card>
  </router-link>
</template>

<script setup lang="ts">
import { CheckmarkCircle, CloseCircle } from "@vicons/ionicons5"

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
