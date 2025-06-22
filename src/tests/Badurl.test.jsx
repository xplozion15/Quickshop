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

describe("Tests for the handling of the bad urls", () => {
  it("Trying to access invalid url shows the error 404 page", async () => {
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/thislinkdoesnotexistlol"],
    });

    render(<RouterProvider router={router} />);
    const error404Heading = await screen.findByRole("heading", {
      name: /Error 404 - Page Not Found/i,
    });
    //assert what should be in the webpage in the shoppingbag component
    expect(error404Heading).toBeInTheDocument();
  });

  it("Trying to access invalid url at level 2 shows the error 404 page as well", async () => {
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/Products/thislinkdoesnotexistlol"],
    });

    render(<RouterProvider router={router} />);
    const error404Heading = await screen.findByRole("heading", {
      name: /Error 404 - Page Not Found/i,
    });
    //assert what should be in the webpage in the shoppingbag component
    expect(error404Heading).toBeInTheDocument();
  });

  it("Go to home button on the error 404 page returns to home", async () => {
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/thislinkdoesnotexistlol"],
    });

    render(<RouterProvider router={router} />);
    const user = userEvent.setup();

    const goToHomeButton = await screen.findByRole("button", {
      name: /go to home/i,
    });
    user.click(goToHomeButton);
    const welcomeText = await screen.findByRole("heading", {
      name: /Welcome to Quickshop./i,
    });
    //assert what should be in the webpage in the shoppingbag component
    expect(welcomeText).toBeInTheDocument();
  });
});
