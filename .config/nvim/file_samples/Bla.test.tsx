import { render, screen } from "@testing-library/react";
import Bla from "./Bla";

describe("Bla", () => {
    function wek() {
        return 123;
    }

    it("renders", async () => {
        const renderResult = render(<Bla />);

        expect(renderResult).toMatchSnapshot();
    });
});
