import { TinyEmitter } from "tiny-emitter"
const eventBus = new TinyEmitter()

export const Events = {
  GET_CONDITION_LIST: "get_condition_list",
  GET_RETRY_STRATEGY: "get_retry_strategy",
  GET_HTTP_URL_PARAMS: "get_http_url_params",
  GET_HTTP_BODY: "get_http_body",
}

export { eventBus }
