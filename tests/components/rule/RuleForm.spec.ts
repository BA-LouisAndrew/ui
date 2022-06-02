import { fireEvent, render, RenderOptions } from "@testing-library/vue"

import RuleForm from "@/components/rule/RuleForm.vue"
import { rule } from "@/seed"

describe("Rule form component", () => {
  const renderComponent = (
    options: RenderOptions = {
      props: {
        rule,
      },
    }
  ) => render(RuleForm, options)

  it("renders the component", () => {
    const { getByTestId } = renderComponent()
    expect(getByTestId("rule-form")).toBeTruthy()
  })

  describe("edit rule", () => {
    it("renders the text `Editing <rule name>` if edit mode is on", () => {
      const { getByText } = renderComponent()
      expect(getByText("Editing")).toBeTruthy()
      expect(getByText(rule.name)).toBeTruthy()
    })

    it("disables editing on the `name` field", () => {
      const { getByPlaceholderText } = renderComponent()
      expect(getByPlaceholderText("Name").hasAttribute("disabled")).toBeTruthy()
    })

    it("displays the delete button", () => {
      const { getByRole } = renderComponent()
      expect(getByRole("button", { name: "Delete rule" })).toBeTruthy()
    })

    it("displays the `Save changes` button", () => {
      const { getByRole } = renderComponent()
      expect(getByRole("button", { name: "Save changes" }))
    })
  })

  describe("create new rule", () => {
    it("renders the text `Create new rule` if create mode is on", () => {
      const { getByText } = renderComponent({ props: {} })

      expect(getByText("Create a new rule")).toBeTruthy()
    })

    it("hides the delete button", () => {
      const { queryByRole } = renderComponent({ props: {} })

      expect(queryByRole("button", { name: "Delete rule" })).toBeFalsy()
    })

    it("displays the `Create rule` button", () => {
      const { getByRole } = renderComponent({ props: {} })

      expect(getByRole("button", { name: "Create rule" })).toBeTruthy()
    })
  })
})
