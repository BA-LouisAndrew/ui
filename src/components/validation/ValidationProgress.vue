<script setup lang="ts">
import {
  CheckmarkCircle,
  CloseCircle,
  RefreshCircle,
  Sync as SyncCircle,
  Time as TimeCircle,
} from "@vicons/ionicons5"
import { computed } from "vue"

import { Validation, ValidationEventStatus } from "@/types"

const props = defineProps<{
  validation: Validation
}>()

const isValidationDone = computed(
  () => props.validation.events.length === props.validation.runnedChecks
)

const getTimelineItemStatus = (status: ValidationEventStatus) => {
  switch (status) {
    case "PASSED":
      return "success"
    case "FAILED":
      return "error"
    case "RUNNING":
      return "info"
    case "NOT_STARTED":
    default:
      return "default"
  }
}

const getTimelineItemContent = (status: ValidationEventStatus) => {
  switch (status) {
    case "PASSED":
      return "Rule validation passed!"
    case "FAILED":
      return "Rule validation failed!"
    case "RUNNING":
      return "Rule validation is running"
    case "NOT_STARTED":
    default:
      return "Rule validation is queued"
  }
}
</script>

<template>
  <n-space data-testid="validation-progress" :size="16">
    <template v-if="isValidationDone">
      <n-h4>
        Validation <n-text code> {{ validation.validationId }} </n-text> is done
      </n-h4>
      <n-space>
        <n-h5> Resulting fraud score </n-h5>
        <n-h5>
          {{ validation?.fraudScore }}
        </n-h5>
      </n-space>
    </template>
    <n-space v-else>
      <n-icon size="24">
        <sync-circle class="rotate" />
      </n-icon>
      <n-h4>
        Validation <n-text code> {{ validation.validationId }} </n-text> is
        running
      </n-h4>
    </n-space>

    <n-timeline class="timeline">
      <n-timeline-item
        v-for="event in validation.events"
        :key="event.name"
        :type="getTimelineItemStatus(event.status)"
      >
        <template #header>
          <n-h5 :class="event.status === 'NOT_STARTED' && 'ghost'">
            {{ event.name }}
          </n-h5>
        </template>

        <n-space :size="8" vertical>
          <n-text :class="event.status === 'NOT_STARTED' && 'ghost'">
            {{ getTimelineItemContent(event.status) }}
          </n-text>
          <n-collapse v-if="event.messages?.length">
            <n-collapse-item>
              <template #header>
                <n-text depth="3"> Messages </n-text>
              </template>

              <n-text
                v-for="(message, index) in event.messages"
                :key="index"
                code
              >
                {{ message }}
              </n-text>
            </n-collapse-item>
          </n-collapse>
        </n-space>

        <template #footer>
          <n-space :space="8" style="margin-top: 8px">
            <n-space v-if="event.dateStarted">
              Date started:
              <n-time
                :time="new Date(event.dateStarted).getTime()"
                format="dd.MMM.yyyy - HH:mm"
              />
            </n-space>

            <template v-if="event.dateEnded">
              <span>|</span>
              <n-space>
                Date ended:
                <n-time
                  :time="new Date(event.dateEnded).getTime()"
                  format="dd.MMM.yyyy - HH:mm"
                />
              </n-space>
            </template>
          </n-space>
        </template>

        <template #icon>
          <n-icon
            size="24"
            :depth="event.status === 'NOT_STARTED' ? 3 : undefined"
          >
            <checkmark-circle v-if="event.status === 'PASSED'" />
            <close-circle v-else-if="event.status === 'FAILED'" />
            <refresh-circle v-else-if="event.status === 'RUNNING'" />
            <time-circle v-else />
          </n-icon>
        </template>
      </n-timeline-item>
    </n-timeline>
  </n-space>
</template>

<style lang="scss" scoped>
.timeline {
  margin-left: 8px;
}

.ghost {
  color: #9d9d9d !important;
}

.rotate {
  animation-name: rotation-animation;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
}

@keyframes rotation-animation {
  0% {
    transform: rotate(0deg);
  }

  10% {
    transform: rotate(36deg);
  }

  20% {
    transform: rotate(72deg);
  }

  30% {
    transform: rotate(108deg);
  }

  40% {
    transform: rotate(144deg);
  }

  50% {
    transform: rotate(180deg);
  }

  60% {
    transform: rotate(216deg);
  }

  70% {
    transform: rotate(252deg);
  }

  80% {
    transform: rotate(288deg);
  }

  90% {
    transform: rotate(324deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
