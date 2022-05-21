<template>
  <div>
    Home
  </div>
  <ConditionList />
  <RetryStrategy />
  <KeyValueInput />
</template>

<script setup lang="ts">
import KeyValueInput from "@/components/common/KeyValueInput.vue"
import ConditionList from "@/components/rule/ConditionList.vue"
import RetryStrategy from "@/components/rule/RetryStrategy.vue"

</script>

<style scoped>

</style>