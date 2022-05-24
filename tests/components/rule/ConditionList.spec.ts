import { fireEvent, render, RenderOptions } from "@testing-library/vue"

import ConditionList from "@/components/rule/ConditionList.vue"
import { conditions } from "@/seed"

describe("Condition list", () => {
  const renderComponent = (options: RenderOptions = {}) =>
    render(ConditionList, {
      ...options
    })

  it("renders a condition card if the `Add condition` button is clicked", async () => {
    const { getByRole, queryAllByTestId } = renderComponent()

    expect(queryAllByTestId("condition-card").length).toBe(0)
    await fireEvent.click(getByRole("button", { name: "Add condition" }))

    expect(queryAllByTestId("condition-card").length).toBe(1)
  })

  it("renders an additional condition card if a condition exists and `Add condition` button is clicked", async () => {
    const { getByRole, queryAllByTestId } = renderComponent({
      props: {
        conditions,
      },
    })

    expect(queryAllByTestId("condition-card").length).toBe(1)
    await fireEvent.click(getByRole("button", { name: "Add condition" }))

    expect(queryAllByTestId("condition-card").length).toBe(2)
  })

  it("renders a radio button to select boolean-condition type", async () => {
    const { getByRole, getByTestId } = renderComponent({
      props: {
        conditions,
      },
    })

    await fireEvent.click(getByRole("button", { name: "Add condition" }))
    expect(getByTestId("boolean-condition-type")).toBeTruthy()
  })

  it("removes a condition card if the delete button is clicked", async () => {
    const { getByRole, queryAllByTestId } = renderComponent({
      props: {
        conditions,
      },
    })
    
    expect(queryAllByTestId("condition-card").length).toBe(1)
    await fireEvent.click(getByRole("button", { name: "Delete" }))

    expect(queryAllByTestId("condition-card").length).toBe(0)
  })
})
