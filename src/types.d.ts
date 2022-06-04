export type Operator = string // TODO
export type ConditionType = "string" | "number" | "array" | "boolean"

export type AutocompleteType =
  | "customer"
  | "response"
  | "all"
  | "secrets"
  | "!response"

export type KeyValuePair = {
  key: string
  value: string
}

type GenericObject = {
  [key: string]: any
}

export type Condition = {
  path: string
  type: ConditionType
  operator: Operator
  value: any
  failMessage: string
}

export type BooleanCondition = {
  any?: Condition[]
  all?: Condition[]
}

export type RetryStrategy = {
  limit: 1 | 2 | 3
  statusCodes: number[] // TODO: validate possible HTTP status codes
}

export type HTTPMethod = "GET" | "PUT" | "POST"

/**
 * Model for the validation rule that would be stored in the database and evaluated during runtime.
 */
export type ValidationRule = {
  retryStrategy?: RetryStrategy
  requestUrlParameter?: GenericObject
  skip: boolean
  requestBody?: GenericObject
  requestHeader?: GenericObject
  condition: Condition | BooleanCondition
  method: HTTPMethod // TODO: validate possible HTTP method
  failScore: number
  endpoint: string
  priority: number
  name: string
}

export type BackendError = {
  message: string
  details?: string
}

export type MappedObject<T> = { [id: string]: T }

/**
 * Model for the validation result object from the backend.
 */
export type Validation = {
  /**
   * Unique identifier (UUIDv4) of the validation process.
   */
  validationId: string
  /**
   * Current fraud score.
   */
  fraudScore: number
  /**
   * Total number of rule checks ro be runned.
   */
  totalChecks: number
  /**
   * Number of checks runned.
   */
  runnedChecks: number
  /**
   * Details of rule check that's currently running.
   */
  currentlyRunning?: {
    /**
     * The number of the currently running check in the order.
     */
    number: number
    /**
     * Unique identifier of the validation rule.
     */
    name: string
  }
  /**
   * Checks that passed.
   */
  passedChecks: ValidationEventResult[]
  /**
   * Checks that failed.
   */
  failedChecks: ValidationEventResult[]
  /**
   * Name of the rules that skipped the check process.
   */
  skippedChecks: string[]
  /**
   * Additional information on the validation process.
   */
  additionalInfo: ValidationAdditionalInfo
  /**
   * A collection of validation events. Containing validation details on passed, check and not started validations.
   */
  events: ValidationEvent[]
}

export type ValidationEventResult = Omit<ValidationEvent, "status">

export type ValidationEventStatus =
  | "NOT_STARTED"
  | "FAILED"
  | "PASSED"
  | "RUNNING"

export type ValidationEvent = {
  /**
   * Name of the rule.
   */
  name: string
  /**
   * Status of the validation event.
   */
  status: ValidationEventStatus
  /**
   * ISO stringified date of when the validation event started.
   */
  dateStarted: string | null
  /**
   * ISO stringified date of when the validation event ended.
   */
  dateEnded: string | null
  /**
   * Mesages that give informations on the validation event.
   */
  messages?: string[]
}

export type ValidationAdditionalInfo = {
  /**
   * Date time information on when the validation started.
   */
  startDate: string
  /**
   * Date time information on when the validation ended.
   */
  endDate?: string
  /**
   * Additional information regarding the validation customer.
   */
  customerInformation?: any // TODO change type to `Customer` type
}

/**
 * Address object of the customer
 */
export type Address<T> = {
  /**
   * Street of where the customer lives.
   * @example "1313 Disneyland Dr"
   */
  streetName: string
  /**
   * Postal code of customer's address
   * @example 92802
   */
  postalCode: T
  /**
   * City of where the customer lives.
   * @example "Anaheim"
   */
  city: string
  /**
   * State of where the customer lives.
   * @example "California"
   */
  state: string
  /**
   * Country on where the customer lives.
   * @example "United States"
   */
  country: string
}

/**
 * Sample entity (customer), on whom the validation should be done.
 */
export interface Customer<T = string> {
  /**
   * First name of the customer.
   * @example "Mickey"
   */
  firstName: string
  /**
   * Last name of the customer.
   * @example "Mouse"
   */
  lastName: string
  /**
   * Customer's address.
   */
  address: Address<T>
  /**
   * Customer's email address.
   * @example "hello-world@mickey.com"
   */
  email: string
  /**
   * Customer's phone number.
   * @example "+17147814636"
   */
  phoneNumber: string
}
