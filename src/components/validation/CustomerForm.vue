<script setup lang="ts">
import { FormInst, FormItemRule } from "naive-ui"
import { reactive, ref } from "vue"

import { Customer } from "@/types"

const emit = defineEmits(["submit"])
const formRef = ref<FormInst>()
const formValues = reactive<Customer>({
  firstName: "",
  lastName: "",
  address: {
    streetName: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
  },
  email: "",
  phoneNumber: "",
})

const onSubmit = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      emit("submit", formValues)
    }
  })
}

const formRules: { [key: string]: FormItemRule | FormItemRule[] } = {
  firstName: {
    required: true,
    trigger: "blur",
  },
  lastName: {
    required: true,
    trigger: "blur",
  },
  email: {
    required: true,
    trigger: "blur",
    type: "email",
  },
  phoneNumber: {
    required: true,
    trigger: "blur",
  },
  streetName: {
    required: true,
    trigger: "blur",
  },
  postalCode: [
    {
      required: true,
      trigger: "blur",
    },
    {
      validator: (_, value) => {
        return !isNaN(parseInt(value, 10))
      },
      message: "Please input a valid postal code",
      trigger: "blur",
    },
  ],
  city: {
    required: true,
    trigger: "blur",
  },
  state: {
    required: true,
    trigger: "blur",
  },
  country: {
    required: true,
    trigger: "blur",
  },
}
</script>

<template>
  <n-space
    class="customer-form"
    justify="space-between"
    vertical
    data-testid="customer-form"
  >
    <h2>Create New Validation</h2>
    <n-space>
      <n-form ref="formRef" :model="formValues" :rules="formRules">
        <n-grid :cols="2" :x-gap="12" :y-gap="8">
          <n-form-item-gi label="First name" path="firstName">
            <n-input
              v-model:value="formValues.firstName"
              placeholder="First name"
            />
          </n-form-item-gi>

          <n-form-item-gi label="Last name" path="lastName">
            <n-input
              v-model:value="formValues.lastName"
              placeholder="Last name"
            />
          </n-form-item-gi>

          <n-form-item-gi span="2" label="Email" path="email">
            <n-input v-model:value="formValues.email" placeholder="Email" />
          </n-form-item-gi>

          <n-form-item-gi span="2" label="Phone number" path="phoneNumber">
            <n-input
              v-model:value="formValues.phoneNumber"
              placeholder="Phone number"
            />
          </n-form-item-gi>

          <n-form-item-gi
            span="1"
            label="Street name"
            path="address.streetName"
            rule-path="streetName"
          >
            <n-input
              v-model:value="formValues.address.streetName"
              placeholder="Street name"
            />
          </n-form-item-gi>

          <n-form-item-gi
            span="1"
            label="Postal code"
            path="address.postalCode"
            rule-path="postalCode"
          >
            <n-input
              v-model:value="formValues.address.postalCode"
              placeholder="Postal code"
            />
          </n-form-item-gi>

          <n-gi span="2">
            <n-space>
              <n-form-item label="City" path="address.city" rule-path="city">
                <n-input
                  v-model:value="formValues.address.city"
                  placeholder="City"
                />
              </n-form-item>

              <n-form-item label="State" path="address.state" rule-path="state">
                <n-input
                  v-model:value="formValues.address.state"
                  placeholder="State"
                />
              </n-form-item>

              <n-form-item
                label="Country"
                path="address.country"
                rule-path="country"
              >
                <n-input
                  v-model:value="formValues.address.country"
                  placeholder="Country"
                />
              </n-form-item>
            </n-space>
          </n-gi>
        </n-grid>
      </n-form>
    </n-space>

    <n-space justify="end">
      <n-button type="primary" @click="onSubmit"> Validate customer </n-button>
    </n-space>
  </n-space>
</template>

<style scoped></style>
