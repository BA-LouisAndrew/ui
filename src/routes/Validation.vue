<script setup lang="ts">
import { ref, watch } from "vue"
import { useRoute } from "vue-router"

import ValidationProgress from "@/components/validation/ValidationProgress.vue"
import { useFetch } from "@/composable/useFetch"
import { Validation } from "@/types"

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
    source.onopen = (event) => {
      isLoading.value = false
      console.log("event source is open")
      console.log(event)
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
          closeConnection()
          errorMessage.value = parsed.details
          // TODO Handle error
          return
        }

        validation.value = parsed as Validation
      } catch {
        // TODO Handle error
      }
    }

    source.onerror = () => {
      hasError.value = true
      closeConnection()
    }

    const closeConnection = () => {
      isLoading.value = false
      hasError.value = true
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
    <validation-progress v-if="validation" :validation="validation" />
  </div>
</template>

<style scoped></style>
