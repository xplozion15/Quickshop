import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { NotFoundPage } from "../components/NotFoundPage";
import { Products } from "../components/Products";
import { Herosection } from "../components/Herosection";
import userEvent from "@testing-library/user-event";
import { ShoppingbagComponent } from "../components/ShoppingBagComponent";
import { CheckoutPage } from "../components/CheckoutPage";

const mockApiReturnValue = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
];

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockApiReturnValue),
    }),
  );
});

const testRoutes = [
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Herosection />,
      },
      { path: "Products", element: <Products /> },
      { path: "Shoppingbag", element: <ShoppingbagComponent /> },
      { path: "Checkoutpage", element: <CheckoutPage /> },
    ],
  },
];

describe("Testing the shopping bag component", () => {
  it("renders the products from the API returned value", async () => {
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/Products"],
    });

    render(<RouterProvider router={router} />);
    // click the add to bag button to add product to cart
    const button = await screen.findByRole("button", { name: /add to bag/i });
    const user = userEvent.setup();
    await user.click(button);

    // click the shopping bag icon to see the shopping bag
    const shoppingBagIcon = screen.getByAltText(/shopping bag/i);
    await user.click(shoppingBagIcon);

    const productTitle = screen.getByText(
      /Fjallraven - Foldsack No. 1 Backpack/i,
    );
    const priceTitle = screen.getByText("$ 109.95", { selector: "p" });
    const image = await screen.findByAltText(/purchased-item/i);

    //assert what should be in the webpage in the shoppingbag component
    expect(productTitle).toBeInTheDocument();
    expect(priceTitle).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  it("Doesnt render the products when add to bag button is not clicked", async () => {
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/Products"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    // click the shopping bag icon to see the shopping bag
    const shoppingBagIcon = screen.getByAltText(/shopping bag/i);
    await user.click(shoppingBagIcon);

    const productTitle = screen.queryByText(
      /Fjallraven - Foldsack No. 1 Backpack/i,
    );
    const priceTitle = screen.queryByText("$ 109.95", { selector: "p" });
    const image = screen.queryByAltText(/purchased-item/i);

    //assert what should be in the webpage in the shoppingbag component
    expect(productTitle).not.toBeInTheDocument();
    expect(priceTitle).not.toBeInTheDocument();
    expect(image).not.toBeInTheDocument();
  });

  it("Increments the quantity count by 1 when clicked on + button", async () => {
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/Products"],
    });

    render(<RouterProvider router={router} />);
    // click the add to bag button to add product to cart
    const button = await screen.findByRole("button", { name: /add to bag/i });
    const user = userEvent.setup();
    await user.click(button);

    // click the shopping bag icon to see the shopping bag
    const shoppingBagIcon = screen.getByAltText(/shopping bag/i);
    await user.click(shoppingBagIcon);

    const plusIcon = screen.getByAltText(/plus-icon/i);
    await user.click(plusIcon);

    const productTitle = screen.getByText(
      /Fjallraven - Foldsack No. 1 Backpack/i,
    );
    const priceTitle = screen.getByText("$ 109.95", { selector: "p" });
    const image = await screen.findByAltText(/purchased-item/i);
    const quantity = screen.getByTestId(/purchased-item-quantity/i);

    //assert what should be in the webpage in the shoppingbag component
    expect(productTitle).toBeInTheDocument();
    expect(priceTitle).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(quantity.textContent).toMatch("2");
  });

  it("Decrements the quantity count by 1 when clicked on - button", async () => {
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/Products"],
    });

    render(<RouterProvider router={router} />);
    // click the add to bag button to add product to cart
    const button = await screen.findByRole("button", { name: /add to bag/i });
    const user = userEvent.setup();
    await user.click(button);

    // click the shopping bag icon to see the shopping bag
    const shoppingBagIcon = screen.getByAltText(/shopping bag/i);
    await user.click(shoppingBagIcon);

    const plusIcon = screen.getByAltText(/plus-icon/i);
    await user.click(plusIcon);

    const minusIcon = screen.getByAltText(/minus-icon/i);
    await user.click(minusIcon);

    const productTitle = screen.getByText(
      /Fjallraven - Foldsack No. 1 Backpack/i,
    );
    const priceTitle = screen.getByText("$ 109.95", { selector: "p" });
    const image = await screen.findByAltText(/purchased-item/i);
    const quantity = screen.getByTestId(/purchased-item-quantity/i);

    //assert what should be in the webpage in the shoppingbag component
    expect(productTitle).toBeInTheDocument();
    expect(priceTitle).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(quantity.textContent).toMatch("1");
  });

  it("Doesnt increment the quantity above 5", async () => {
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/Products"],
    });

    render(<RouterProvider router={router} />);
    // click the add to bag button to add product to cart
    const button = await screen.findByRole("button", { name: /add to bag/i });
    const user = userEvent.setup();
    await user.click(button);

    // click the shopping bag icon to see the shopping bag
    const shoppingBagIcon = screen.getByAltText(/shopping bag/i);
    await user.click(shoppingBagIcon);

    const plusIcon = screen.getByAltText(/plus-icon/i);

    //click the button 6 times but even after clicking 6 times the quantity should stay 5
    for (let i = 0; i <= 6; i++) {
      await user.click(plusIcon);
    }

    const quantity = screen.getByTestId(/purchased-item-quantity/i);

    //assert what should be in the webpage in the shoppingbag component

    expect(quantity.textContent).toMatch("5");
  });

  it("Doesnt decrement the quantity below 1", async () => {
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/Products"],
    });

    render(<RouterProvider router={router} />);
    // click the add to bag button to add product to cart
    const button = await screen.findByRole("button", { name: /add to bag/i });
    const user = userEvent.setup();
    await user.click(button);

    // click the shopping bag icon to see the shopping bag
    const shoppingBagIcon = screen.getByAltText(/shopping bag/i);
    await user.click(shoppingBagIcon);

    const minusIcon = screen.getByAltText(/minus-icon/i);

    //click the button 2 times but even after clicking 2 times the quantity should stay 1
    for (let i = 0; i <= 2; i++) {
      await user.click(minusIcon);
    }

    const quantity = screen.getByTestId(/purchased-item-quantity/i);

    //assert what should be in the webpage in the shoppingbag component

    expect(quantity.textContent).toMatch("1");
  });

  it("Delete icon removes the product div and decrements the count in navbar/doesnt show count was 1 before deleting", async () => {
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/Products"],
    });

    render(<RouterProvider router={router} />);
    // click the add to bag button to add product to cart
    const button = await screen.findByRole("button", { name: /add to bag/i });
    const user = userEvent.setup();
    await user.click(button);

    // click the shopping bag icon to see the shopping bag
    const shoppingBagIcon = screen.getByAltText(/shopping bag/i);
    await user.click(shoppingBagIcon);

    const plusIcon = screen.getByAltText(/plus-icon/i);
    await user.click(plusIcon);

    const delIcon = screen.getByAltText(/del-icon/i);
    await user.click(delIcon);

    //assert what should be in the webpage in the shoppingbag component
    const navbarCount = screen.queryByTestId("shoppingbag-count");
    expect(navbarCount).not.toBeInTheDocument();
  });

  it("Checkout container shows 0 subtotal and total price when there is 0 item in the shopping bag and check if empty bag text is displayed", async () => {
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/Products"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    // click the shopping bag icon to see the shopping bag
    const shoppingBagIcon = screen.getByAltText(/shopping bag/i);
    await user.click(shoppingBagIcon);

    //assert what should be in the webpage in the shoppingbag component
    const totalHeading = screen.getByTestId("total-heading");
    const totalParagraph = screen.getByTestId("total-paragraph");
    const subTotalParagraph = screen.getByTestId("subtotal-paragraph");
    const yourBagIsEmptyText = screen.getByText("🛒 Your bag is empty!");

    expect(totalHeading.textContent).toMatch("$ 0");
    expect(totalParagraph.textContent).toMatch("0");
    expect(subTotalParagraph.textContent).toMatch("0");
    expect(yourBagIsEmptyText).toBeInTheDocument();
  });

  it("Checkout container shows  correctprice of  subtotal and total price when there is 1 item in the shopping bag and plus and minus icon is clicked", async () => {
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/Products"],
    });

    render(<RouterProvider router={router} />);

    // click the add to bag button to add product to cart
    const button = await screen.findByRole("button", { name: /add to bag/i });
    const user = userEvent.setup();
    await user.click(button);

    // click the shopping bag icon to see the shopping bag
    const shoppingBagIcon = screen.getByAltText(/shopping bag/i);
    await user.click(shoppingBagIcon);

    //assert what should be in the webpage in the shoppingbag component
    const totalHeading = screen.getByTestId("total-heading");
    const totalParagraph = screen.getByTestId("total-paragraph");
    const subTotalParagraph = screen.getByTestId("subtotal-paragraph");

    expect(totalHeading.textContent).toMatch("$ 129.95");
    expect(totalParagraph.textContent).toMatch("129.95");
    expect(subTotalParagraph.textContent).toMatch("109.95");
  });

  it("Checkout container shows price of  subtotal and total price when there is 1 item in the shopping bag", async () => {
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/Products"],
    });

    render(<RouterProvider router={router} />);

    // click the add to bag button to add product to cart
    const button = await screen.findByRole("button", { name: /add to bag/i });
    const user = userEvent.setup();
    await user.click(button);

    // click the shopping bag icon to see the shopping bag
    const shoppingBagIcon = screen.getByAltText(/shopping bag/i);
    await user.click(shoppingBagIcon);

    //click plus icon 2 times and minus icon 1 time to make sure plus and minus icons change the checkout container values of total and subtotal price.
    const plusIcon = screen.getByAltText(/plus-icon/i);
    const minusIcon = screen.getByAltText(/minus-icon/i);
    await user.click(plusIcon);
    await user.click(plusIcon);
    await user.click(minusIcon);

    //assert what should be in the webpage in the shoppingbag component
    const totalHeading = screen.getByTestId("total-heading");
    const totalParagraph = screen.getByTestId("total-paragraph");
    const subTotalParagraph = screen.getByTestId("subtotal-paragraph");

    expect(totalHeading.textContent).toMatch("$ 239.90");
    expect(totalParagraph.textContent).toMatch("239.90");
    expect(subTotalParagraph.textContent).toMatch("219.90");
  });

  it("Clicking on the checkout button when there is atleast one product shows successful purchase page", async () => {
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/Products"],
    });

    render(<RouterProvider router={router} />);

    // click the add to bag button to add product to cart
    const button = await screen.findByRole("button", { name: /add to bag/i });
    const user = userEvent.setup();
    await user.click(button);

    // click the shopping bag icon to see the shopping bag
    const shoppingBagIcon = screen.getByAltText(/shopping bag/i);
    await user.click(shoppingBagIcon);

    //click the checkout button
    const checkoutButton = screen.getByRole("button", { name: /Checkout/i });
    await user.click(checkoutButton);

    //assert what should be in the webpage in the shoppingbag component
    const thanksText = await screen.findByText(/Thanks for the purchase/i);

    expect(thanksText).toBeInTheDocument();
  });

  it("Clicking on the checkout button when there is no product does nothing", async () => {
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/Products"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    // click the shopping bag icon to see the shopping bag
    const shoppingBagIcon = screen.getByAltText(/shopping bag/i);
    await user.click(shoppingBagIcon);

    //click the checkout button
    const yourBagIsEmptyText = screen.getByText(/🛒 Your bag is empty!/i);
    const checkoutButton = screen.getByRole("button", { name: /Checkout/i });
    await user.click(checkoutButton);

    //assert what should be in the webpage in the shoppingbag component

    expect(yourBagIsEmptyText).toBeInTheDocument();
  });
});
