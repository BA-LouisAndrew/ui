export type Operator = string // TODO
export type ConditionType = "string" | "number" | "array" | "boolean"

export type KeyValuePair = {
  key: string;
  value: string;
};

type GenericObject = {
  [key: string]: any
}

export type Condition = {
 path: string,
 type: ConditionType
 operator: Operator
 value: any
 failMessage: string
}

export type BooleanCondition =
  | {
      all: Condition[];
    }
  | {
      any: Condition[];
    };

export type RetryStrategy = {
    limit: 1 | 2 | 3;
    statusCodes: number[]; // TODO: validate possible HTTP status codes
}
/**
 * Model for the validation rule that would be stored in the database and evaluated during runtime.
 */
export type ValidationRule = {
    retryStrategy?: RetryStrategy;
    requestUrlParameter?: GenericObject;
    skip: boolean;
    requestBody?: GenericObject;
    condition: Condition | BooleanCondition;
    method: string; // TODO: validate possible HTTP method
    failScore: number;
    endpoint: string;
    priority: number;
    name: string;
  }