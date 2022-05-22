import { statusCodes } from "@/statusCodes"
import {
  Condition,
  ConditionType,
  GenericObject,
  HTTPMethod,
  KeyValuePair,
  ValidationRule,
} from "@/types"

export type RuleFormValuesType = Pick<
  ValidationRule,
  "priority" | "endpoint" | "failScore" | "name"
> & {
  method: HTTPMethod | null;
  enabled: boolean;
};

export type ConditionsProps = { conditions?: Condition[], booleanConditionValue?: "any" | "all" }

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

export const genericObjectToKeyValuePairs = (object: GenericObject): KeyValuePair[] =>
  Object.entries(object).map(([key, value]) => ({ key, value }))

export const getConditionsProps = (validationRule?: ValidationRule) : ConditionsProps => {
  
  if (!validationRule?.condition) {
    return {
      conditions: [],
      booleanConditionValue: undefined
    }
  }

  const { condition } = validationRule
  
  const conditionKeys = Object.keys(condition)
  const isUsingAny = conditionKeys.includes("any")
  const isUsingAll = conditionKeys.includes("all")

  if (isUsingAll) {
    return {
      conditions:  (condition as any)["all"] as Condition[],
      booleanConditionValue: "all"
    }
  }

  if (isUsingAny) {
    return {
      conditions: (condition as any)["any"] as Condition[],
      booleanConditionValue: "any"
    }
  }
  
  return {
    conditions: [condition as Condition],
    booleanConditionValue: undefined
  }
}

export const statusCodeOptions = statusCodes
