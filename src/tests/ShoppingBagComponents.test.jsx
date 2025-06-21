import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { NotFoundPage } from "../components/NotFoundPage";
import { Products } from "../components/Products";
import { Herosection } from "../components/Herosection";
import userEvent from "@testing-library/user-event";
import { ShoppingbagComponent } from "../components/ShoppingBagComponent";
import { act } from "@testing-library/react";


const mockApiReturnValue = [{
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "rating": {
        "rate": 3.9,
        "count": 120
    }
}]


beforeEach(() => {
    global.fetch = vi.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(mockApiReturnValue),
        }),
    );
})



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

        ],
    },
];

describe("Testing the shopping bag component", () => {

    it("render the products from the api returned value", async () => {
        const router = createMemoryRouter(testRoutes, {
            initialEntries: ["/Products"],
        });


        await act( async() => {
        render(<RouterProvider router={router} />);
        const button = screen.getByRole("button", { name: /add to bag/i });
        const user = userEvent.setup();
        await user.click(button);
        const productTitle = await screen.findByText(/Fjallraven - Foldsack No. 1 Backpack/i);
        const priceTitle = await screen.findByText(/109.95/i);
        const image = screen.getByAltText(/product-item-image/i);
        expect(productTitle).toBeInTheDocument();
        expect(priceTitle).toBeInTheDocument();
        expect(image).toBeInTheDocument();        
});})


  
    
});



