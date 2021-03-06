import { v4 } from "uuid"

import { Validation } from "./types"
export const createUuid = () => v4()
export const createMappedObject = <T>(array: T[]) =>
  array.reduce((a, b) => ({ ...a, [createUuid()]: b }), {})

export const isValidationRunning = (validation: Validation) => {
  const { totalChecks, skippedChecks, runnedChecks } = validation
  return runnedChecks < totalChecks - skippedChecks.length
}

export const BASE_AUTOCOMPLETE_OPTIONS = [
  {
    content: "Customer's first name",
    value: "$.customer.firstName",
    label: "$.customer.firstName",
    group: "customer",
  },
  {
    content: "Customer's last name",
    value: "$.customer.lastName",
    label: "$.customer.lastName",
    group: "customer",
  },
  {
    content: "Customer's email",
    value: "$.customer.email",
    label: "$.customer.email",
    group: "customer",
  },
  {
    content: "Customer's phone number",
    value: "$.customer.phoneNumber",
    label: "$.customer.phoneNumber",
    group: "customer",
  },
  {
    content: "Customer's address street",
    value: "$.customer.address.streetName",
    label: "$.customer.address.streetName",
    group: "customer",
  },
  {
    content: "Customer's postal code",
    value: "$.customer.address.postalCode",
    label: "$.customer.address.postalCode",
    group: "customer",
  },
  {
    content: "Customer's address city",
    value: "$.customer.address.city",
    label: "$.customer.address.city",
    group: "customer",
  },
  {
    content: "Customer's address state",
    value: "$.customer.address.state",
    label: "$.customer.address.state",
    group: "customer",
  },
  {
    content: "Customer's address country",
    value: "$.customer.address.country",
    label: "$.customer.address.country",
    group: "customer",
  },
  {
    content: "Response status code",
    value: "$.response.statusCode",
    label: "$.response.statusCode",
    group: "response",
  },
  {
    content: "Response body",
    value: "$.response.body",
    label: "$.response.body",
    group: "response",
  },
  {
    content: "Response raw body",
    value: "$.response.rawBody",
    label: "$.response.rawBody",
    group: "response",
  },
  {
    content: "Response status message",
    value: "$.response.statusMessage",
    label: "$.response.statusMessage",
    group: "response",
  },
  {
    content: "Response retry count",
    value: "$.response.retryCount",
    label: "$.response.retryCount",
    group: "response",
  },
]
