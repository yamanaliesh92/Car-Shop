import Sign from "../components/sign";
import { render, screen,  } from "@testing-library/react";
import 

describe("test carCard", () => {
  it("test", () => {
    render(<Sign />);
    const title=screen.getByTestId("we")
    expect(title).toBeInTheDocument();
  });
  
});

export {};
