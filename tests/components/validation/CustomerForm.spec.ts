import { fireEvent, render, RenderOptions } from "@testing-library/vue"

import CustomerForm from "@/components/validation/CustomerForm.vue"
import { presetCustomers } from "@/components/validation/customers"

describe("Customer form", () => {
  const [sample] = presetCustomers
  const renderComponent = (options: RenderOptions = {}) =>
    render(CustomerForm, options)

  it("renders the component", () => {
    expect(renderComponent().getByTestId("customer-form")).toBeTruthy()
  })

  it("prefills the form with sample customer", async () => {
    const { getByPlaceholderText, getByRole } = renderComponent()

    await fireEvent.click(getByRole("button", { name: sample.label }))
    expect(
      (getByPlaceholderText("First name") as HTMLInputElement).value
    ).toEqual(sample.data.firstName)
    expect(
      (getByPlaceholderText("Postal code") as HTMLInputElement).value
    ).toEqual(sample.data.address.postalCode)
  })

  it("emits the `submit` event if the `Validate customer` button is clicked", async () => {
    const { getByRole, emitted } = renderComponent()
    await fireEvent.click(getByRole("button", { name: sample.label }))
    await fireEvent.click(getByRole("button", { name: "Validate customer" }))

    console.log(emitted())
  })
})
