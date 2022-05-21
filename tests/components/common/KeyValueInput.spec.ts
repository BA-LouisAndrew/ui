import { fireEvent, render, RenderOptions } from "@testing-library/vue"

import KeyValueInput from "@/components/common/KeyValueInput.vue"

describe("Key-Value input", () => {
  const renderComponent = (options: RenderOptions = {}) =>
    render(KeyValueInput, options)

  it("renders the component", () => {
    const { getByTestId } = renderComponent()
    expect(getByTestId("key-value-input")).toBeTruthy()
  })

  it("renders a new key-value input fiels when the `Add` button is clicked", async () => {
    const { getByRole, queryAllByTestId } = renderComponent()

    expect(queryAllByTestId("key-value-field").length).toBe(0)
    await fireEvent.click(getByRole("button", { name: "Add" }))

    expect(queryAllByTestId("key-value-field").length).toBe(1)
    await fireEvent.click(getByRole("button", { name: "Add" }))

    expect(queryAllByTestId("key-value-field").length).toBe(2)
  })

  it("deletes the key-value input when the `Delete` button next to key-value input fields is clicked", async () => {
    const { getByRole, getAllByRole, queryAllByTestId } = renderComponent()

    expect(queryAllByTestId("key-value-field").length).toBe(0)
    await fireEvent.click(getByRole("button", { name: "Add" }))
    await fireEvent.click(getByRole("button", { name: "Add" }))

    await fireEvent.click(getAllByRole("button", { name: "Delete" })[0])

    expect(queryAllByTestId("key-value-field").length).toBe(1)
  })

  it("renders the key-value input fields with default data if provided via props", () => {
    const { getByPlaceholderText } = renderComponent({
      props: {
        keyValuePairs: [
          {
            key: "name",
            value: "Mickey",
          },
        ],
      },
    })

    expect((getByPlaceholderText("Key") as HTMLInputElement).value).toBe(
      "name"
    )
    expect((getByPlaceholderText("Value") as HTMLInputElement).value).toBe(
      "Mickey"
    )
  })

  it("emits the correct data", async () => {
    const keyValuePairs = [
      { key: "name", value: "Mickey" },
      { key: "lastName", value: "Mouse" },
    ]
    const { getByRole, getAllByPlaceholderText, emitted } = renderComponent()

    await fireEvent.click(getByRole("button", { name: "Add" }))
    await fireEvent.click(getByRole("button", { name: "Add" }))

    await Promise.all(
      getAllByPlaceholderText("Key").map((field, index) =>
        fireEvent.update(field, keyValuePairs[index].key)
      )
    )
    await Promise.all(
      getAllByPlaceholderText("Value").map((field, index) =>
        fireEvent.update(field, keyValuePairs[index].value)
      )
    )

    const emitValue = emitted()["input"]
    expect(emitValue).toBeTruthy()
  })
})
