import { Condition } from "@/types"
export const conditions: Condition[] = [{
  operator: "equals",
  path: "$.statusCode",
  type: "number",
  value: 200
}]