import { v4 } from "uuid"
export const createUuid = () => v4()
export const createMappedObject = <T>(array: T[]) =>
  array.reduce((a, b) => ({ ...a, [createUuid()]: b }), {})
