import { render, RenderOptions } from "@testing-library/vue"

import ValidationProgress from "@/components/validation/ValidationProgress.vue"
import { doneValidation, runningValidation, validation } from "@/seed"

describe("Validation Progress component", () => {
  const renderComponent = (options: RenderOptions = {}) =>
    render(ValidationProgress, {
      props: {
        validation,
      },
      ...options,
    })

  it("renders the component", () => {
    const { getByTestId } = renderComponent()
    expect(getByTestId("validation-progress")).toBeTruthy()
  })

  it("renders an indicator if the validation is still in progress", () => {
    const { getByText } = renderComponent({
      props: {
        validation: runningValidation,
      },
    })
    expect(getByText("Validation is running")).toBeTruthy()
  })

  it("renders an indicator if the validation is done", () => {
    const { getByText } = renderComponent({
      props: {
        validation: doneValidation,
      },
    })

    expect(getByText("Validation is done")).toBeTruthy()
    expect(getByText("Resulting fraud score")).toBeTruthy()
    expect(getByText(validation.fraudScore)).toBeTruthy()
  })

  it("renders an indicator that a rule evaluation is currently in progress", () => {
    const [event] = validation.events
    const { getByText } = renderComponent({
      props: {
        validation: runningValidation,
      },
    })

    expect(getByText(event.name)).toBeTruthy()
    expect(getByText("Rule validation is running")).toBeTruthy()
  })
})
