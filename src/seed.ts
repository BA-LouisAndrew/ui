import { Condition, RetryStrategy, ValidationRule } from "@/types"

export const conditions: Condition[] = [
  {
    operator: "equals",
    path: "$.statusCode",
    type: "number",
    value: 200,
    failMessage: "",
  },
]

export const retryStrategy: RetryStrategy = {
  limit: 2,
  statusCodes: [400],
}

export const rule: ValidationRule = {
  skip: false,
  requestBody: {
    name: "$.firstName",
  },
  condition: {
    failMessage: "Status code doesn't equal to 200. Received: $",
    value: 200,
    operator: "equals",
    type: "number",
    path: "$.statusCode",
  },
  method: "GET",
  failScore: 0.3,
  endpoint:
    "https://https://louisandrew-bachelorarbeit.herokuapp.com/api/v1/checks/address",
  priority: 2,
  name: "Sample Rule .1",
}
