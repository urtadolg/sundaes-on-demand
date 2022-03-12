import { render, screen } from "@testing-library/react";
import Options from "../Options";

test("display image for each scoop option from server", async () => {
   render(<Options optionType="scoops" />);

   const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
   expect(scoopImages).toHaveLength(2);

   const altNames = scoopImages.map((element) => element.alt);
   expect(altNames).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("display image for each toppings option from server", async () => {
   render(<Options optionType="toppings" />);

   const toppingsImages = await screen.findAllByRole("img", {
      name: /topping$/i,
   });
   expect(toppingsImages).toHaveLength(3);

   const toppingsAltText = toppingsImages.map((element) => element.alt);
   expect(toppingsAltText).toEqual([
      "Cherries topping",
      "M&Ms topping",
      "Hot fudge topping",
   ]);
});
