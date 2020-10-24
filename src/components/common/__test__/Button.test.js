import React from "react";
import ReactDOM from "react-dom";
import Button from "./../Button";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Button />, div);
});
it("renders button correctly", () => {
  const { getByTestId } = render(<Button label="click me" />);
  expect(getByTestId("button")).toHaveTextContent("click me");
});

it("matches snapshot", () => {
  const tree = renderer.create(<Button label="click me" />).toJSON;
  expect(tree).toMatchSnapshot();
});
