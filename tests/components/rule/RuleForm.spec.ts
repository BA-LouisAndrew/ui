import { fireEvent, render, RenderOptions, waitFor } from "@testing-library/vue"

import RuleForm from "@/components/rule/RuleForm.vue"
import { rule } from "@/seed"
import { Condition, ValidationRule } from "@/types"

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

    it("emits the correct event when the rule is updated", async () => {
      const { getByPlaceholderText, getByRole, emitted } = renderComponent()

      await fireEvent.update(getByPlaceholderText("Path"), "XX")

      await fireEvent.click(getByRole("button", { name: "Save changes" }))
      await waitFor(() => expect(emitted()["update"]).toBeTruthy())
      const newRule = (emitted()["update"][0] as any)[0] as ValidationRule
      expect((newRule.condition as Condition).path).toEqual("XX")
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
