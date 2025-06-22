import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { NotFoundPage } from "../components/NotFoundPage";
import { Herosection } from "../components/Herosection";

const testRoutes = [
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/", // route for /
        element: <Herosection />,
      },
    ],
  },
];

describe("App component", () => {
  const router = createMemoryRouter(testRoutes);

  it("renders navbar correctly", () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders the hero section correctly", () => {
    render(<RouterProvider router={router} />);
    expect(screen.queryByTestId("hero-section")).toBeInTheDocument();
  });
});
