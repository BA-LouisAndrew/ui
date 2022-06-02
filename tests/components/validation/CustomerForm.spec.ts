import { fireEvent, render, RenderOptions } from "@testing-library/vue"

import CustomerForm from "@/components/validation/CustomerForm.vue"

describe("Customer form", () => {
  const renderComponent = (options: RenderOptions = {}) =>
    render(CustomerForm, options)

  it("renders the component", () => {
    expect(renderComponent().getByTestId("customer-form")).toBeTruthy()
  })

  it.skip("prefills the form with sample customer", () => {
    expect(1).toBe(2)
  })

  it.skip("emits the `submit` event if the `Validate Customer` button is clicked", async () => {
    expect(1).toBe(2)
  })
})
