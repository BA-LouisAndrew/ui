/* eslint-disable @typescript-eslint/no-explicit-any */
import { eventBus, Events } from "@/event-bus"
import { retryStrategy } from "@/seed"
import { statusCodes } from "@/statusCodes"
import {
  BooleanCondition,
  Condition,
  ConditionType,
  GenericObject,
  HTTPMethod,
  KeyValuePair,
  RetryStrategy,
  ValidationRule,
} from "@/types"

export type RuleFormValuesType = Pick<
  ValidationRule,
  "priority" | "endpoint" | "failScore" | "name"
> & {
  method: HTTPMethod | null;
  enabled: boolean;
};

export type ConditionsProps = {
  conditions?: Condition[];
  booleanConditionValue?: "any" | "all";
};

export const getAvailableOperators = (type: ConditionType) => {
  switch (type) {
  case "string":
    return [
      { label: "Equals", value: "eq" },
      { label: "Starts with", value: "starts" },
      { label: "Includes", value: "incl" },
      { label: "Ends with", value: "ends" },
    ]
  case "number":
    return [
      { label: "Greater than", value: "gt" },
      { label: "Greater than equals", value: "gte" },
      { label: "Lesser than", value: "lt" },
      { label: "Leser than equals", value: "lte" },
      { label: "Equals", value: "eq" },
    ]
  case "array":
    return [
      { label: "Includes", value: "incl" },
      { label: "Excludes", value: "excl" },
      { label: "Number of items equals", value: "len" },
      { label: "Is empty", value: "empty" },
    ]
  case "boolean":
    return [{ label: "Equals", value: "eq" }]
  default:
    return []
  }
}

export const getFormValuesFromValidationRule = (
  validationRule?: ValidationRule
): RuleFormValuesType => {
  if (!validationRule) {
    return {
      priority: 0,
      endpoint: "",
      failScore: 0,
      name: "",
      method: null,
      enabled: true,
    }
  }

  const { priority, endpoint, failScore, name, method, skip } = validationRule

  return {
    priority,
    endpoint,
    failScore,
    name,
    method,
    enabled: !skip,
  }
}

export const httpMethodOptions: { label: string; value: HTTPMethod }[] = [
  {
    label: "Get",
    value: "GET",
  },
  { label: "Post", value: "POST" },
  { label: "Put", value: "PUT" },
]

export const genericObjectToKeyValuePairs = (
  object: GenericObject
): KeyValuePair[] =>
  Object.entries(object).map(([key, value]) => ({ key, value }))

export const keyValuePairsToGenericObject = (
  pairs: KeyValuePair[]
): GenericObject =>
  pairs.reduce((a, { key, value }) => ({ ...a, [key]: value }), {})

export const getConditionsProps = (
  validationRule?: ValidationRule
): ConditionsProps => {
  if (!validationRule?.condition) {
    return {
      conditions: [],
      booleanConditionValue: undefined,
    }
  }

  const { condition } = validationRule

  const conditionKeys = Object.keys(condition)
  const isUsingAny = conditionKeys.includes("any")
  const isUsingAll = conditionKeys.includes("all")

  if (isUsingAll) {
    return {
      conditions: (condition as any)["all"] as Condition[],
      booleanConditionValue: "all",
    }
  }

  if (isUsingAny) {
    return {
      conditions: (condition as any)["any"] as Condition[],
      booleanConditionValue: "any",
    }
  }

  return {
    conditions: [condition as Condition],
    booleanConditionValue: undefined,
  }
}

const validateConditionProperties = (condition: any) => {
  const props = ["path", "type", "operator", "failMessage"]
  const isPropsValid = props.every((key) => condition[key] !== undefined)

  if (condition.type === "number") {
    return isPropsValid && !isNaN(parseFloat(condition.value))
  }

  return isPropsValid
}

export const validateCondition = (
  condition: Condition | BooleanCondition | null | undefined
) => {
  if (!condition || (Array.isArray(condition) && condition.length === 0)) {
    eventBus.emit(Events.NO_CONDITION_DETECTED)
    return false
  }

  eventBus.emit(Events.VALIDATE_CONDITION)
  const conditionKeys = Object.keys(condition)
  if (conditionKeys.includes("any")) {
    const conditions = (condition as BooleanCondition).any
    return conditions?.every(validateConditionProperties)
  }

  if (conditionKeys.includes("all")) {
    const conditions = (condition as BooleanCondition).all
    return conditions?.every(validateConditionProperties)
  }

  if (Array.isArray(condition)) {
    eventBus.emit(Events.NO_BOOLEAN_CONDITION)
    return false
  }

  return validateConditionProperties(condition)
}

export const validateRetryStrategy = (
  retryStrategy: RetryStrategy | null | undefined
) => {
  if (retryStrategy) {
    eventBus.emit(Events.VALIDATE_RETRY_STRATEGY)
    return !!retryStrategy.limit
  }

  return true
}

export const normalizeConditionValue = (condition: Condition) => {
  const { type, value } = condition
  if (type === "number") {
    return parseFloat(value)
  }

  if (type === "boolean") {
    return value === "true"
  }

  return value
}

export const getConditionFromProps = (
  conditions: Condition[],
  booleanConditionValue: string | undefined | null
): Condition | BooleanCondition => {
  const normalizedConditions = conditions.map((condition) => ({
    ...condition,
    value: normalizeConditionValue(condition.value),
  }))

  if (!booleanConditionValue) {
    if (conditions.length === 1) {
      return normalizedConditions[0]
    }

    return normalizedConditions as unknown as Condition // Error will be thrown during validation
  }

  return {
    [booleanConditionValue]: normalizedConditions,
  } as BooleanCondition
}

export const statusCodeOptions = statusCodes
