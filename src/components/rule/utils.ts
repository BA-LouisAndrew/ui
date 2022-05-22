import { statusCodes } from "@/statusCodes"
import { ConditionType, HTTPMethod, ValidationRule } from "@/types"

export type RuleFormValuesType = Pick<
  ValidationRule,
  "priority" | "endpoint" | "failScore" | "name"
> & {
  method: HTTPMethod | null;
  enabled: boolean;
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

export const statusCodeOptions = statusCodes
