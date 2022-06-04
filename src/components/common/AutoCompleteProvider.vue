<script setup lang="ts">
import { AutoCompleteOption, NTag, SelectOption, TagProps } from "naive-ui"
import { h, provide, ref, VNodeChild, watch } from "vue"

import { AutocompleteType } from "@/types"
import { BASE_AUTOCOMPLETE_OPTIONS } from "@/utils"

const props = defineProps<{ secrets: string[] }>()

const autocompleteOptions = ref<AutoCompleteOption[]>(BASE_AUTOCOMPLETE_OPTIONS)

const getAutocompleteOptions = (group: AutocompleteType) => {
  if (group === "all") {
    return autocompleteOptions.value
  }

  if (group.startsWith("!")) {
    return autocompleteOptions.value.filter(
      (option) => option.group !== group.slice(1)
    )
  }

  return autocompleteOptions.value.filter((option) => option.group === group)
}

const renderLabel = (option: SelectOption): VNodeChild => {
  let type: TagProps["type"]
  switch (option.group) {
    case "customer":
      type = "info"
      break
    case "response":
      type = "success"
      break
    case "secret":
    default:
      type = "warning"
      break
  }

  return [
    option.label as string,
    " ",
    h(NTag, { size: "small", type }, { default: () => option.content }),
  ]
}

const getShowLabel = (value: string) => value.includes("$")

watch(
  () => props.secrets,
  (value) => {
    autocompleteOptions.value = [
      ...BASE_AUTOCOMPLETE_OPTIONS,
      ...value.map((key) => ({
        content: "Secret",
        value: `$.secrets.${key}`,
        label: `$.secrets.${key}`,
        group: "secret",
      })),
    ]
  },
  { deep: true, immediate: true }
)

provide("getShowLabel", getShowLabel)
provide("renderLabel", renderLabel)
provide("getAutocompleteOptions", getAutocompleteOptions)
</script>

<template>
  <slot> </slot>
</template>

<style scoped></style>
