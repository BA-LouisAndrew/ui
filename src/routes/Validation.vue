<script setup lang="ts">
import { useNotification } from "naive-ui"
import { onBeforeMount, ref } from "vue"
import { useRoute } from "vue-router"

import ValidationProgress from "@/components/validation/ValidationProgress.vue"
import { useFetch } from "@/composable/useFetch"
import { validation as sampleValidation } from "@/seed"
import { Validation } from "@/types"

const { params } = useRoute()
const { url, isLoading, hasError } = useFetch(
  "/validate/" + params.validationId + "/subscribe"
)
const { error } = useNotification()

const validation = ref<Validation | null>(sampleValidation)

const initEventSource = async () => {
  const eventSource = new EventSource(url)

  eventSource.onopen = (event) => {
    isLoading.value = false
    console.log("event source is open")
    console.log(event)
  }

  eventSource.onmessage = (messageEvent) => {
    const data = messageEvent.data
    try {
      const parsed = JSON.parse(data)
      if (parsed.close) {
        closeConnection()
        return
      }

      if (parsed.error) {
        closeConnection()
        error({
          title: parsed.message,
          content: parsed.details,
        })
        // TODO Handle error
        return
      }

      validation.value = parsed as Validation
    } catch {
      // TODO Handle error
    }
  }

  eventSource.onerror = (error) => {
    console.log(error)
    closeConnection()
  }

  const closeConnection = () => {
    isLoading.value = false
    hasError.value = true
    eventSource.close()
  }
}

onBeforeMount(async () => {
  await initEventSource()
})
</script>

<template>
  <span v-if="isLoading"> Loading </span>
  <div v-else>
    <validation-progress v-if="validation" :validation="validation" />
  </div>
</template>

<style scoped></style>
