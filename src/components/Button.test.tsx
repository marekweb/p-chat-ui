import { render } from "@testing-library/react"
import { Button } from "./Button"

test("Renders an primary button", () => {
  const result = render(<Button type="primary">Submit</Button>)

  expect(result.getByText("Submit")).toBeInTheDocument()
})

test("Renders a secondary buton", () => {
  const result = render(<Button type="secondary">Submit</Button>)

  expect(result.getByText("Submit")).toBeInTheDocument()
})
