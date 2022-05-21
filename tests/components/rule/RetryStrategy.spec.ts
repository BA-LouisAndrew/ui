import { fireEvent, render, RenderOptions } from "@testing-library/vue"

import RetryStrategy from "@/components/rule/RetryStrategy.vue"
import { retryStrategy } from "@/seed"

describe("Retry strategy form item", () => {
  const renderComponent = (options: RenderOptions = {}) =>
    render(RetryStrategy, options)

  it("renders the component successfully", () => {
    const { getByText } = renderComponent()
    expect(getByText("Retry Strategy")).toBeTruthy()
  })

  it("renders a button to add retry strategy if none is present", () => {
    const { getByRole } = renderComponent()
    expect(getByRole("button", { name: "Add retry strategy" })).toBeTruthy()
  })

  it("renders a delete button to delete retry strategy if it is present", async () => {
    const { getByRole } = renderComponent()

    await fireEvent.click(getByRole("button", { name: "Add retry strategy" }))
    expect(getByRole("button", { name: "Delete" })).toBeTruthy()
  })

  it("uses default values for retry strategy if it is provided by props", () => {
    const { getByPlaceholderText } = renderComponent({
      props: {
        retryStrategy,
      },
    })

    expect((getByPlaceholderText("Limit") as HTMLInputElement).value).toBe(
      retryStrategy.limit.toString()
    )
  })
})
