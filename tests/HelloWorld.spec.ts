import { render } from "@testing-library/vue"

import HelloWorld from "@/components/HelloWorld.vue"

describe("Hello world", () => {
  it("renders the component", () => {
    const { getByText } = render(HelloWorld)

    expect(getByText("Vite Docs")).toBeTruthy()
  })
})