<script setup lang="ts">
import hljs from "highlight.js/lib/core"
import json from "highlight.js/lib/languages/json"
import { ref, watch } from "vue"
import { useRoute } from "vue-router"

import ValidationProgress from "@/components/validation/ValidationProgress.vue"
import { useFetch } from "@/composable/useFetch"
import { Validation } from "@/types"
import { isValidationRunning } from "@/utils"

hljs.registerLanguage("json", json)
const route = useRoute()

const { url, updateUrl, isLoading, hasError } = useFetch("")

const validation = ref<Validation | null>(null)
const eventSource = ref<EventSource | null>()
const errorMessage = ref("")

const DEFAULT_ERR_MSG =
  "Something went wrong when trying to get the latest data. Please try again later"

const initEventSource = () => {
  hasError.value = false
  validation.value = null
  eventSource.value = new EventSource(url.value)
}

watch(eventSource, (source, oldSource) => {
  console.log("event source changed")
  if (oldSource && !oldSource.CLOSED) {
    oldSource.close()
  }

  if (source) {
    source.onopen = () => {
      isLoading.value = false
    }

    source.onmessage = (messageEvent) => {
      const data = messageEvent.data
      try {
        const parsed = JSON.parse(data)
        if (parsed.close) {
          closeConnection()
          return
        }

        if (parsed.error) {
          errorMessage.value = parsed.details
          hasError.value = true
          closeConnection()
          // TODO Handle error
          return
        }

        validation.value = parsed as Validation
        if (!isValidationRunning(parsed)) {
          closeConnection()
        }
      } catch {
        // TODO Handle error
      }
    }

    source.onerror = (errorMessage) => {
      console.log(errorMessage)
      hasError.value = true
      closeConnection()
    }

    const closeConnection = () => {
      console.log("Closing connection")
      isLoading.value = false
      source.close()
    }
  }
})

watch(
  () => route.path,
  () => {
    updateUrl("/validate/" + route.params.validationId + "/subscribe")
    initEventSource()
  },
  { immediate: true }
)
</script>

<template>
  <span v-if="isLoading"> Loading </span>
  <n-alert v-else-if="hasError" title="Something went wrong" type="error">
    {{ errorMessage || DEFAULT_ERR_MSG }}
  </n-alert>

  <div v-else>
    <n-config-provider :hljs="hljs">
      <validation-progress v-if="validation" :validation="validation" />
    </n-config-provider>
  </div>
</template>

<style scoped></style>
