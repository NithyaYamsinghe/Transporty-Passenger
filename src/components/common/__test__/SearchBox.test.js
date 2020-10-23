// import React from "react";
// import ReactDOM from "react-dom";
// import SearchBox from "./../SearchBox";
// import { render, cleanup } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import renderer from "react-test-renderer"

// afterEach(cleanup);

// const handleChange = () => {
//   return true;
// };
// it("renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<SearchBox />, div);
// });
// it("renders search box correctly", () => {
//   const { getByTestId } = render(
//     <SearchBox placeholder="search" search="name" handleChange={handleChange} />
//   );
//   expect(getByTestId("search-box")).toHaveTextContent(
//     handleChange,
//     "name",
//     "search"
//   );
// });

// it("matches snapshot", ()=>{
//     renderer.create( <SearchBox placeholder="search" search="name" handleChange={handleChange} />).toJSON;
//     expect(tree).toMatchSnapshot();
// })
