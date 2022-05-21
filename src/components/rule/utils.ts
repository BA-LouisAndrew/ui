import { statusCodes } from "@/statusCodes"
import { ConditionType } from "@/types"

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

export const statusCodeOptions = statusCodes