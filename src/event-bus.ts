import { TinyEmitter } from "tiny-emitter"
const eventBus = new TinyEmitter()

export const Events = {
  VALIDATE_CONDITION: "validate_condition",
  NO_CONDITION_DETECTED: "no_condition",
  NO_BOOLEAN_CONDITION: "no_bool_condition",
  VALIDATE_RETRY_STRATEGY: "validate_retry",
}

export { eventBus }
