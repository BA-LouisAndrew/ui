<template>
  <span v-if="isLoading"> Loading </span>
  <div v-else-if="hasError">
    Error!
  </div>
  <div v-else>
    <div class="">
      Validation {{ params.validationId }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue"
import { useRoute } from "vue-router"

import { useFetch } from "@/composable/useFetch"

const { params } = useRoute()
const { url, isLoading, hasError } = useFetch(
  "/validate/" + params.validationId + "/subscribe"
)

const initEventSource = async () => {
  const eventSource = new EventSource(url)

  eventSource.onopen = (event) => {
    isLoading.value = false
    console.log("event source is open")
    console.log(event)
  }

  eventSource.onmessage = (message) => {
    console.log(message)
  }

  eventSource.onerror = (error) => {
    console.log(error)
    isLoading.value = false
    hasError.value = true
  }
}

onBeforeMount(async () => {
  await initEventSource()
})
</script>

<style scoped></style>
