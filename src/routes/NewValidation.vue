<script setup lang="ts">
import { useRouter } from "vue-router"

import CustomerForm from "@/components/validation/CustomerForm.vue"
import { useFetch } from "@/composable/useFetch"
import { Customer, Validation } from "@/types"

const {
  isLoading,
  post: createNewValidation,
  hasError,
} = useFetch<Customer<number>>("/validate")
const { push } = useRouter()

const onSubmitForm = async (customer: Customer) => {
  try {
    const { data } = await createNewValidation<
      Pick<Validation, "validationId">
    >({
      ...customer,
      address: {
        ...customer.address,
        postalCode: parseInt(customer.address.postalCode, 10),
      },
    })

    if (data.validationId) {
      push(`/validations/${data.validationId}`)
    } else {
      hasError.value = true
    }
  } catch (e) {
    hasError.value = true
    console.error(e)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <span v-if="hasError">Error</span>
  <n-spin v-else :show="isLoading" size="large" stroke="#fff">
    <CustomerForm @submit="onSubmitForm" />
    <template #description>
      <h3 style="color: white">Scheduling validation</h3>
    </template>
  </n-spin>
</template>

<style scoped></style>
