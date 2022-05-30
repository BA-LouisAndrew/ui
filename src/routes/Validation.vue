<template>
  <span v-if="isLoading"> Loading </span>
  <div v-else>
    <div class="">
      Validation {{ params.validationId }}
      <div
        v-for="(message, index) in messages"
        :key="index"
      >
        {{ JSON.stringify(JSON.parse(message), null, 2) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue"
import { useRoute } from "vue-router"

import { useFetch } from "@/composable/useFetch"

const { params } = useRoute()
const { url, isLoading, hasError } = useFetch(
  "/validate/" + params.validationId + "/subscribe"
)

const messages = ref<string[]>([])

const initEventSource = async () => {
  const eventSource = new EventSource(url)

  eventSource.onopen = (event) => {
    isLoading.value = false
    console.log("event source is open")
    console.log(event)
  }

  eventSource.onmessage = (messageEvent) => {
    messages.value.push(messageEvent.data)
  }

  eventSource.onerror = (error) => {
    console.log(error)
    isLoading.value = false
    hasError.value = true
    eventSource.close()
  }
}

onBeforeMount(async () => {
  await initEventSource()
})
</script>

<style scoped></style>
