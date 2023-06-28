import { render, screen } from "@testing-library/react";
import Component from "./xy";

describe("Test-Suite Name", () => {
    it("renders", async () => {
        const renderResult = render(<Component />);

        expect(renderResult).toMatchSnapshot();
    });
});
