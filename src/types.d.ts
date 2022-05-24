export type Operator = string; // TODO
export type ConditionType = "string" | "number" | "array" | "boolean";

export type KeyValuePair = {
  key: string;
  value: string;
};

type GenericObject = {
  [key: string]: any;
};

export type Condition = {
  path: string;
  type: ConditionType;
  operator: Operator;
  value: any;
  failMessage: string;
};

export type BooleanCondition = {
  any?: Condition[]
  all?: Condition[]
}

export type RetryStrategy = {
  limit: 1 | 2 | 3;
  statusCodes: number[]; // TODO: validate possible HTTP status codes
};

export type HTTPMethod = "GET" | "PUT" | "POST";

/**
 * Model for the validation rule that would be stored in the database and evaluated during runtime.
 */
export type ValidationRule = {
  retryStrategy?: RetryStrategy;
  requestUrlParameter?: GenericObject;
  skip: boolean;
  requestBody?: GenericObject;
  condition: Condition | BooleanCondition;
  method: HTTPMethod; // TODO: validate possible HTTP method
  failScore: number;
  endpoint: string;
  priority: number;
  name: string;
};

export type BackendError = {
  message: string;
  details?: string;
};

export type MappedObject<T> = { [id: string]: T };
