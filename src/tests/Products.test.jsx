import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { NotFoundPage } from "../components/NotFoundPage";
import { Products } from "../components/Products";
import { Herosection } from "../components/Herosection";
import userEvent from "@testing-library/user-event";


beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockApiReturnValue),
    }),
  );
});

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
    ],
  },
];

describe("Product component", () => {
  it("renders the products section correctly", async () => {
    const router = createMemoryRouter(testRoutes);
    render(<RouterProvider router={router} />);
    const button = screen.getByRole("button", { name: /start shopping/i });
    const user = userEvent.setup();
    await user.click(button);
    expect(
      screen.getByRole("heading", { name: /Products/i }),
    ).toBeInTheDocument();
  });

  it("render the products from the api returned value", async () => {
    const router = createMemoryRouter(testRoutes);
    render(<RouterProvider router={router} />);
    const button = screen.getByRole("button", { name: /start shopping/i });
    const user = userEvent.setup();
    await user.click(button);
    const productTitle = await screen.findByText(
      /Fjallraven - Foldsack No. 1 Backpack/i,
    );
    const priceTitle = await screen.findByText(/109.95/i);
    const image = screen.getByAltText(/product-image/i);
    expect(productTitle).toBeInTheDocument();
    expect(priceTitle).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  it("Increments the counter in the navigation bar when add to bag button is clicked on a unique item", async () => {
    const router = createMemoryRouter(testRoutes);
    render(<RouterProvider router={router} />);
    // setup to click on start shopping button and then add the item once i.e unique item
    const user = userEvent.setup();
    const startShoppingButton = screen.getByRole("button", {
      name: /start shopping/i,
    });
    await user.click(startShoppingButton);
    const addToBagButton = screen.getByRole("button", { name: /add to bag/i });
    await user.click(addToBagButton);
    const navigationBarItemCount = screen.queryByTestId("shoppingbag-count");
    expect(navigationBarItemCount.textContent).toBe("1");
  });

  it("Doesnt increment the counter in the navigation bar when add to bag button is clicked on a non-unique item", async () => {
    const router = createMemoryRouter(testRoutes);
    render(<RouterProvider router={router} />);
    // setup to click on start shopping button and then add the item twice i.e non-unique item
    const user = userEvent.setup();
    const startShoppingButton = screen.getByRole("button", {
      name: /start shopping/i,
    });
    await user.click(startShoppingButton);
    const addToBagButton = screen.getByRole("button", { name: /add to bag/i });
    await user.click(addToBagButton);
    await user.click(addToBagButton);
    const navigationBarItemCount = screen.queryByTestId("shoppingbag-count");
    expect(navigationBarItemCount.textContent).toBe("1");
  });
});
