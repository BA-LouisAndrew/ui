import { render, RenderOptions } from "@testing-library/vue"

import RuleListItem from "@/components/rule-list/RuleListItem.vue"
import { rule } from "@/seed"

describe("Rule list item", () => {
  const renderComponent = (
    options: RenderOptions = {
      props: {
        rule,
      },
    }
  ) => render(RuleListItem, options)

  it("renders the component", () => {
    const { getByTestId } = renderComponent()
    expect(getByTestId("rule-list-item")).toBeTruthy()
  })

  it("links to the correct url", () => {
    const { getByTestId } = renderComponent()
    expect(getByTestId("rule-list-item").getAttribute("to")).toContain(
      "/rules/" + rule.name
    )
  })

  it("displays the correct data", () => {
    const { getByText } = renderComponent()

    expect(getByText(rule.name)).toBeTruthy()
    expect(getByText("Enabled")).toBeTruthy()
  })
})
