import { fireEvent, render, RenderOptions } from "@testing-library/vue"

import ConditionCard from "@/components/rule/ConditionCard.vue"

describe("Condition card", () => {
  const renderComponent = (options: RenderOptions = {}) =>
    render(ConditionCard, options)

  it("renders the component", () => {
    const { getByTestId } = renderComponent()
    expect(getByTestId("condition-card")).toBeTruthy()
  })

  it("emits the input value on input event", async () => {
    const { getByPlaceholderText, emitted } = renderComponent()

    await fireEvent.update(getByPlaceholderText("Path"), "Hi mom")
    expect(emitted()["input"]).toBeTruthy()
  })

  it("displays default value if provided on props", () => {
    const { getByPlaceholderText } = renderComponent({
      props: {
        defaultValues: {
          path: "$.statusCode",
          type: "number",
          operator: "equals",
          value: 200,
        },
      },
    })

    expect((getByPlaceholderText("Path") as HTMLInputElement).value).toEqual(
      "$.statusCode"
    )
  })
  
  it("emits `delete` event if the delete button is clicked",async  () => {
    const { getByRole, emitted } = renderComponent()
    
    await fireEvent.click(getByRole("button", { name: "Delete" }))
    expect(emitted()["delete"]).toBeTruthy()
  })
})
