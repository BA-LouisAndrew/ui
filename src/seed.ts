import { Condition, RetryStrategy, Validation, ValidationRule } from "@/types"

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

export const validation: Validation = {
  validationId: "e77ad2c0-8329-4cc5-abea-344823e665f5",
  totalChecks: 4,
  runnedChecks: 2,
  skippedChecks: ["Always Pass"],
  additionalInfo: {
    startDate: "2022-05-31T08:18:37.006Z",
    customerInformation: {
      firstName: "Mickey",
      lastName: "Mouse",
      address: {
        country: "United States",
        state: "California",
        city: "Anaheim",
        postalCode: 92802,
        streetName: "1313 Disneyland Dr",
      },
      email: "hello-world@mickey.com",
      phoneNumber: "+17147814636",
    },
  },
  events: [
    {
      name: "Test",
      status: "PASSED",
      dateStarted: "2022-05-31T08:18:37.007Z",
      dateEnded: "2022-05-31T08:18:42.074Z",
      messages: [],
    },
    {
      name: "Always fail",
      status: "FAILED",
      dateStarted: "2022-05-31T08:18:37.007Z",
      dateEnded: "2022-05-31T08:18:42.074Z",
      messages: ["It's always failing!"],
    },
    {
      name: "Always running",
      status: "RUNNING",
      dateStarted: "2022-05-31T08:18:37.007Z",
      dateEnded: null,
      messages: [],
    },
    {
      name: "Always queued",
      status: "NOT_STARTED",
      dateStarted: null,
      dateEnded: null,
    },
  ],
  passedChecks: [
    {
      name: "Test",
      dateStarted: "2022-05-31T08:18:37.007Z",
      dateEnded: "2022-05-31T08:18:42.074Z",
      messages: [],
    },
  ],
  failedChecks: [
    {
      name: "Always fail",
      dateStarted: "2022-05-31T08:18:37.007Z",
      dateEnded: "2022-05-31T08:18:42.074Z",
      messages: ["It's always failing!"],
    },
  ],
  fraudScore: 0.2,
}

export const runningValidation: Validation = {
  ...validation,
  runnedChecks: 0,
  events: [
    {
      name: "Test",
      status: "RUNNING",
      dateStarted: null,
      dateEnded: null,
      messages: [],
    },
  ],
  passedChecks: [],
}

export const doneValidation: Validation = {
  ...validation,
  totalChecks: 1,
  skippedChecks: [],
  runnedChecks: 1,
  events: [
    {
      name: "Test",
      status: "PASSED",
      dateStarted: "2022-05-31T08:18:37.007Z",
      dateEnded: "2022-05-31T08:18:42.074Z",
      messages: [],
    },
  ],
}
