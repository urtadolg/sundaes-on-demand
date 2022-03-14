import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("scoops subtotals update correctly", async () => {
   render(<Options optionType="scoops" />);

   const scoopSubtotals = screen.getByText("Scoops total: $", { exact: false });
   expect(scoopSubtotals).toHaveTextContent("0.00");

   const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
   });
   userEvent.clear(vanillaInput);
   userEvent.type(vanillaInput, "1");
   expect(scoopSubtotals).toHaveTextContent("2.00");

   const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
   });
   userEvent.clear(chocolateInput);
   userEvent.type(chocolateInput, "2");
   expect(scoopSubtotals).toHaveTextContent("6.00");
});

//assert on default toppings subtotal
//find and tick one box, assert on updated subtotal
//tick other box and assert updated subtotal
//tick some box again to uncheck and assert subtotal

test("toppings subtotals works correctly", async () => {
   render(<Options optionType="toppings" />);

   const toppingSubtotal = screen.getByText("Toppings total: $", {
      exact: false,
   });
   expect(toppingSubtotal).toHaveTextContent("0.00");

   const mmOption = await screen.findByRole("checkbox", { name: /m&ms/i });
   userEvent.click(mmOption);
   expect(toppingSubtotal).toHaveTextContent("1.50");

   const hotFudgeOption = await screen.findByRole("checkbox", {
      name: /Hot Fudge/i,
   });
   userEvent.click(hotFudgeOption);
   expect(toppingSubtotal).toHaveTextContent("3.00");

   userEvent.click(mmOption);
   expect(toppingSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
   test("grand total updates properly if scoop is added first", async () => {
      render(<OrderEntry />);

      const grandTotal = await screen.findByRole("heading", {
         name: /Grand total: \$/i,
      });
      expect(grandTotal).toHaveTextContent("0.00");

      const chocolateOptionScoop = await screen.findByRole("spinbutton", {
         name: /chocolate/i,
      });
      userEvent.clear(chocolateOptionScoop);
      userEvent.type(chocolateOptionScoop, "1");

      const cherryOptionTopping = await screen.findByRole("checkbox", {
         name: /m&ms/i,
      });
      userEvent.click(cherryOptionTopping);

      expect(grandTotal).toHaveTextContent("3.50");

      userEvent.type(chocolateOptionScoop, "0");
      userEvent.click(cherryOptionTopping);
      expect(grandTotal).toHaveTextContent("0");
   });
});
