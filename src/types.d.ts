export type Operator = string // TODO
export type ConditionType = "string" | "number" | "array"

export type Condition = {
 path: string,
 type: ConditionType
 operator: Operator
 value: any
}