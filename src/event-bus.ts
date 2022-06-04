import { TinyEmitter } from "tiny-emitter"
const eventBus = new TinyEmitter()

export const Events = {
  VALIDATE_CONDITION: "validate_condition",
  NO_CONDITION_DETECTED: "no_condition",
  NO_BOOLEAN_CONDITION: "no_bool_condition",
  VALIDATE_RETRY_STRATEGY: "validate_retry",
  SHOW_SECRETS_DIALOG: "show_secrets",
  REFETCH_SECRETS: "refetch_secrets",
}

export { eventBus }
