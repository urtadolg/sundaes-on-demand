import {
   screen,
   render,
   waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test("Checking initial values", () => {
   render(<SummaryForm />);
   const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
   });
   const button = screen.getByRole("button", { name: /confirm order/i });
   expect(checkbox).not.toBeChecked();
   expect(button).toBeDisabled();
});

test("Checking checkbox enables button and unchechking checkbox disables button", () => {
   render(<SummaryForm />);
   const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
   });
   const button = screen.getByRole("button", { name: /confirm order/i });
   userEvent.click(checkbox);
   expect(button).toBeEnabled();
   userEvent.click(checkbox);
   expect(button).toBeDisabled();
});

test("Popover responds to hover", async () => {
   render(<SummaryForm />);

   const popoverNull = screen.queryByText(
      "no ice cream will actually be delivered"
   );
   expect(popoverNull).not.toBeInTheDocument();

   const termsAndConditions = screen.getByText("Terms and Conditions");
   userEvent.hover(termsAndConditions);

   const popover = screen.getByText(/no ice cream will actually be delivered/i);
   expect(popover).toBeInTheDocument();

   userEvent.unhover(termsAndConditions);
   await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
   );
});
