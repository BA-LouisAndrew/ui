export type Operator = string // TODO
export type ConditionType = "string" | "number" | "array"

export type Condition = {
 path: string,
 type: ConditionType
 operator: Operator
 value: any
}

export type RetryStrategy = {
    limit: 1 | 2 | 3;
    statusCodes: number[]; // TODO: validate possible HTTP status codes
}