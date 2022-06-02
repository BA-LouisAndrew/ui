import { render, RenderOptions } from "@testing-library/vue"

import ValidationListItem from "@/components/validation-list/ValidationListItem.vue"
import { doneValidation, runningValidation, validation } from "@/seed"

describe("Rule list item", () => {
  const renderComponent = (
    options: RenderOptions = {
      props: {
        validation,
      },
    }
  ) => render(ValidationListItem, options)

  it("renders the component", () => {
    const { getByTestId } = renderComponent()
    expect(getByTestId("validation-list-item")).toBeTruthy()
  })

  it("links to the correct url", () => {
    const { getByTestId } = renderComponent()
    expect(getByTestId("validation-list-item").getAttribute("to")).toContain(
      "/validations/" + validation.validationId
    )
  })

  it("displays the correct validation id", () => {
    const { getByText } = renderComponent()

    expect(getByText(validation.validationId)).toBeTruthy()
  })

  it.each([
    {
      state: "running",
      text: "Running",
      validation: runningValidation,
    },
    {
      state: "done",
      text: "Done",
      validation: doneValidation,
    },
  ])(
    "displays the correct indicator if the validation is $state",
    ({ text, validation }) => {
      const { getByText } = renderComponent({
        props: {
          validation,
        },
      })

      expect(getByText(text)).toBeTruthy()
    }
  )
})
