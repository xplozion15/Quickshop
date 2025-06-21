import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { NotFoundPage } from "../components/NotFoundPage";
import { Products } from "../components/Products";
import { Herosection } from "../components/Herosection";
import userEvent from "@testing-library/user-event";
import { ShoppingbagComponent } from "../components/ShoppingBagComponent";
import {  CheckoutPage } from "../components/CheckoutPage"


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
            {path : "Herosection", element : <Herosection/>},
            { path: "Products", element: <Products /> },
            { path: "Shoppingbag", element: <ShoppingbagComponent /> },
            { path : "Checkoutpage", element : <CheckoutPage/>}

        ],
    },
];



describe("Tests for the checkout page",()=>{
     it("Clicking on the go to home page loads the home page", async () => {
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
        const checkoutButton = screen.getByRole("button",{name : /Checkout/i});
        await user.click(checkoutButton);
        
        //select the go to home button 
        const goToHomeButton = screen.getByRole("button",{name : /go to home/i});
        await user.click(goToHomeButton);

        //assert what should be in the webpage in the shoppingbag component
        const welcomeText = await screen.findByText(/Welcome to Quickshop./i);
    
        expect(welcomeText).toBeInTheDocument();
      });
})


