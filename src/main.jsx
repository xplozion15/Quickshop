import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { Herosection } from "./components/Herosection.jsx";
import { CheckoutPage } from "./components/CheckoutPage.jsx";
import { Products } from "./components/Products.jsx";
import { ShoppingbagComponent } from "./components/ShoppingBagComponent.jsx";
import { NotFoundPage } from "./components/NotFoundPage.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement : <NotFoundPage/>,
     children: [
      { path: "/", 
        element: <Herosection />, 
        
      },
      { path: "Products", 
        element: <Products/>,
      },
      { path: "Shoppingbag", 
        element: <ShoppingbagComponent/> 
      },
      { path: "Checkoutpage", 
        element: <CheckoutPage/> 
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
