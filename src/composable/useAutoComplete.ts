/* eslint-disable indent */
import { AutoCompleteOption, SelectOption } from "naive-ui"
import { inject, VNodeChild } from "vue"

import { AutocompleteType } from "@/types"

export const useAutocomplete = () => {
  const getShowLabel = inject<(value: string) => boolean>(
    "getShowLabel",
    () => true
  )

  const renderLabel = inject<(option: SelectOption) => VNodeChild>(
    "renderLabel",
    () => []
  )

  const getAutocompleteOptions = inject<
    (group: AutocompleteType) => AutoCompleteOption[]
  >("getAutocompleteOptions", () => [])

  return {
    getAutocompleteOptions,
    renderLabel,
    getShowLabel,
  }
}
