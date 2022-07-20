/**
 * See: https://datatracker.ietf.org/doc/html/rfc7231#section-6.1
 */
export const statusCodes: { label: string; value: number }[] = [
  {
    value: 400,
    label: "400 - Bad request",
  },
  {
    value: 401,
    label: "401 - Unauthorized",
  },
  {
    value: 402,
    label: "402 - Payment required",
  },
  {
    value: 403,
    label: "403 - Forbidden",
  },
  {
    value: 404,
    label: "404 - Not found",
  },
  {
    value: 405,
    label: "405 - Method not allowed",
  },
  {
    value: 406,
    label: "406 - Not acceptable",
  },
  {
    value: 407,
    label: "407 - Proxy authentication required",
  },
  {
    value: 408,
    label: "408 - Request timeout",
  },
  {
    value: 409,
    label: "409 - Conflict",
  },
  {
    value: 410,
    label: "410 - Gone",
  },
  {
    value: 411,
    label: "411 - Length required",
  },
  {
    value: 412,
    label: "412 - Precondition failed",
  },
  {
    value: 413,
    label: "413 - Payload too large",
  },
  {
    value: 414,
    label: "414 - URI too long",
  },
  {
    value: 415,
    label: "415 - Unsupported media type",
  },
  {
    value: 416,
    label: "416 - Range not satisfiable",
  },
  {
    value: 417,
    label: "417 - Expectation failed",
  },
  {
    value: 426,
    label: "426 - Upgrade required",
  },
  {
    value: 500,
    label: "500 - Internal server error",
  },
  {
    value: 501,
    label: "510 - Not implemented",
  },
  {
    value: 502,
    label: "502 - Bad gateway",
  },
  {
    value: 503,
    label: "503 - Service unavailable",
  },
  {
    value: 504,
    label: "504 - Gateway timeout",
  },
  {
    value: 505,
    label: "505 - HTTP version not supported",
  },
]
