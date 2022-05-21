import { Condition, RetryStrategy } from "@/types"

export const conditions: Condition[] = [{
  operator: "equals",
  path: "$.statusCode",
  type: "number",
  value: 200
}]

export const retryStrategy: RetryStrategy = {
  limit: 2,
  statusCodes: [400]
}