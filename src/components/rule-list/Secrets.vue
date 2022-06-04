<script setup lang="ts">
import { FormInst } from "naive-ui"
import { onBeforeUnmount, onMounted, reactive, ref, watch } from "vue"

import { useFetch } from "@/composable/useFetch"
import { eventBus, Events } from "@/event-bus"

const props = defineProps<{ secrets: string[] }>()

const { post: postNewSecret, _delete, url } = useFetch("/secrets/")

const isCreatingNewSecret = ref(false)
const show = ref(false)
const newSecretFormRef = ref<FormInst>()
const isLoading = ref(false)
const newSecretForm = reactive({
  key: "",
  value: "",
})

const newSecretFormRules = {
  key: [
    {
      required: true,
      trigger: "blur",
    },
    {
      validator: (_: any, value: string) => !value.includes(" "),
      trigger: "blur",
      message: "Secret key cannot include whitespace",
    },
  ],
  value: {
    required: true,
    trigger: "blur",
  },
}

const createSecret = async () => {
  newSecretFormRef.value?.validate(async (err) => {
    if (!err) {
      try {
        isLoading.value = true
        await postNewSecret(newSecretForm)
        eventBus.emit(Events.REFETCH_SECRETS)
      } catch (e) {
        console.error(e)
      } finally {
        isLoading.value = false
      }
    }
  })
}

const deleteSecret = async (secretKey: string) => {
  isLoading.value = true
  try {
    await _delete(url.value + secretKey)
    eventBus.emit(Events.REFETCH_SECRETS)
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  eventBus.on(Events.SHOW_SECRETS_DIALOG, () => {
    show.value = true
  })
})

onBeforeUnmount(() => {
  eventBus.off(Events.SHOW_SECRETS_DIALOG)
})

watch(isCreatingNewSecret, (value) => {
  if (!value) {
    newSecretForm.key = ""
    newSecretForm.value = ""
  }
})
</script>

<template>
  <n-modal
    v-model:show="show"
    :closable="!isLoading"
    :mask-closable="!isLoading"
  >
    <n-card
      style="width: 600px"
      :title="isCreatingNewSecret ? 'Create new secret' : 'Secrets'"
      size="huge"
      role="dialog"
    >
      <n-form
        v-if="isCreatingNewSecret"
        ref="newSecretFormRef"
        :model="newSecretForm"
        :rules="newSecretFormRules"
      >
        <n-space :size="12">
          <n-space
            class="form-content"
            :size="12"
            justify="space-between"
            align="center"
          >
            <n-form-item label="Secret key" path="key">
              <n-input
                v-model:value="newSecretForm.key"
                :disabled="isLoading"
                placeholder="Secret key"
              />
            </n-form-item>
            <n-form-item label="Secret value" path="value">
              <n-input
                v-model:value="newSecretForm.value"
                :disabled="isLoading"
                placeholder="Secret value"
              />
            </n-form-item>
          </n-space>
          <n-space>
            <n-button
              secondary
              type="primary"
              :loading="isLoading"
              @click="isCreatingNewSecret = false"
            >
              Cancel
            </n-button>
            <n-button
              primary
              type="primary"
              :loading="isLoading"
              @click="createSecret"
            >
              Create
            </n-button>
          </n-space>
        </n-space>
      </n-form>

      <n-space v-else vertical :size="16">
        <n-space vertical>
          <n-space
            v-for="secretKey in props.secrets"
            :key="secretKey"
            align="center"
          >
            <n-tag type="success">
              {{ secretKey }}
            </n-tag>

            <n-popconfirm
              :positive-button-props="{ type: 'error' }"
              positive-text="Yes"
              negative-text="No"
              :show-icon="false"
              @positive-click="deleteSecret(secretKey)"
            >
              <template #trigger>
                <n-button secondary type="error" size="tiny"> Delete </n-button>
              </template>
              Are you sure?
            </n-popconfirm>
          </n-space>
        </n-space>

        <n-button
          secondary
          type="primary"
          :loading="isLoading"
          @click="isCreatingNewSecret = true"
        >
          Create a new secret
        </n-button>
      </n-space>
    </n-card>
  </n-modal>
</template>

<style scoped>
.form-content {
  width: 100%;
}
</style>
