import { v4 } from "uuid"

import { Validation } from "./types"
export const createUuid = () => v4()
export const createMappedObject = <T>(array: T[]) =>
  array.reduce((a, b) => ({ ...a, [createUuid()]: b }), {})

export const isValidationRunning = (validation: Validation) => {
  const { totalChecks, skippedChecks, runnedChecks } = validation
  return runnedChecks < totalChecks - skippedChecks.length
}
