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
      { path: "Herosection", element: <Herosection /> },
      { path: "Products", element: <Products /> },
      { path: "Shoppingbag", element: <ShoppingbagComponent /> },
      { path: "Checkoutpage", element: <CheckoutPage /> },
    ],
  },
];

describe("Tests for the navbar", async () => {
  it("Clicking on the quickshop logo  loads the home page", async () => {
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/Products"],
    });
    render(<RouterProvider router={router} />);
    const user = userEvent.setup();
    const logo = screen.getByTestId(/logo/i);
    await user.click(logo);
    //assert what should be in the webpage in the shoppingbag component
    const welcomeText = await screen.findByText(/Welcome to Quickshop./i);
    expect(welcomeText).toBeInTheDocument();
  });

  it("Clicking on the products link loads the product page", async () => {
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/Shoppingbag"],
    });
    render(<RouterProvider router={router} />);
    const user = userEvent.setup();
    const productsLink = screen.getByTestId(/products-link/i);
    await user.click(productsLink);
    //assert what should be in the webpage in the shoppingbag component
    const productsText = screen.getByRole("heading", { name: /products/i });
    expect(productsText).toBeInTheDocument();
  });

  it("Clicking on the shopping bag div loads the shopping bag page", async () => {
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/"],
    });
    render(<RouterProvider router={router} />);
    const user = userEvent.setup();
    const shoppingBagIconDiv = screen.getByTestId(/shopping-bag-icon-div/i);
    await user.click(shoppingBagIconDiv);
    //assert what should be in the webpage in the shoppingbag component
    const shoppingBagText = screen.getByRole("heading", {
      name: /shopping bag/i,
    });
    expect(shoppingBagText).toBeInTheDocument();
  });
});
